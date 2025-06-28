import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Create Supabase client with service role key for server-side operations
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    let data;
    let eventType;
    let event;

    // verify Stripe event is legit
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
        console.error(`Webhook signature verification failed. ${err.message}`);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }

    data = event.data;
    eventType = event.type;

    try {
        switch (eventType) {
            case 'checkout.session.completed': {
                // First payment is successful and a subscription is created (if mode was set to "subscription" in ButtonCheckout)
                // ✅ Grant access to the product
                const session = await stripe.checkout.sessions.retrieve(
                    data.object.id,
                    {
                        expand: ['line_items']
                    }
                );
                const customerId = session?.customer;
                const customer = await stripe.customers.retrieve(customerId);
                const priceId = session?.line_items?.data[0]?.price.id;

                if (!customer.email) {
                    console.error('No customer email found');
                    throw new Error('No customer email found');
                }

                // Find user in auth.users by email
                const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
                
                if (authError) {
                    console.error('Error listing users:', authError);
                    throw new Error('Error finding user');
                }

                const authUser = authUsers.users.find(u => u.email === customer.email);
                
                if (!authUser) {
                    console.error('No user found with email:', customer.email);
                    throw new Error('No user found');
                }

                // Update user subscription record in users table
                // Note: The user record already exists due to the trigger in 004_create_users_table.sql
                const { error: updateError } = await supabase
                    .from('users')
                    .update({ plan_id: priceId })
                    .eq('user_id', authUser.id);

                if (updateError) {
                    console.error('Error updating user subscription:', updateError);
                    throw new Error('Error updating user subscription');
                }

                console.log('User subscription updated for:', customer.email);

                // Extra: >>>>> send email to dashboard <<<<

                break;
            }

            case 'customer.subscription.deleted': {
                // ❌ Revoke access to the product
                // The customer might have changed the plan (higher or lower plan, cancel soon etc...)
                const subscription = await stripe.subscriptions.retrieve(
                    data.object.id
                );
                
                // Get customer from Stripe
                const customer = await stripe.customers.retrieve(subscription.customer);
                
                if (!customer.email) {
                    console.error('No customer email found');
                    throw new Error('No customer email found');
                }

                // Find user in auth.users by email
                const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
                
                if (authError) {
                    console.error('Error listing users:', authError);
                    throw new Error('Error finding user');
                }

                const authUser = authUsers.users.find(u => u.email === customer.email);
                
                if (!authUser) {
                    console.error('No user found with email:', customer.email);
                    throw new Error('No user found');
                }

                // Revoke access by setting plan_id to null
                const { error: updateError } = await supabase
                    .from('users')
                    .update({ plan_id: null })
                    .eq('user_id', authUser.id);

                if (updateError) {
                    console.error('Error revoking user access:', updateError);
                    throw new Error('Error revoking user access');
                }

                console.log('User access revoked for:', customer.email);

                break;
            }

            default:
                console.log(`Unhandled event type: ${eventType}`);
        }
    } catch (e) {
        console.error(
            'stripe error: ' + e.message + ' | EVENT TYPE: ' + eventType
        );
        return NextResponse.json({ error: e.message }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}