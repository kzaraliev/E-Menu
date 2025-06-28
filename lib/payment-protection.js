import { useState, useEffect } from 'react';
import { supabase } from './supabase';

// Hook for checking user subscription status
export function useSubscription(user) {
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [restaurantCount, setRestaurantCount] = useState(0);

  useEffect(() => {
    if (!user) {
      setHasActiveSubscription(false);
      setRestaurantCount(0);
      setLoading(false);
      return;
    }

    const checkSubscription = async () => {
      try {
        // Check if user has active subscription
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('plan_id')
          .eq('user_id', user.id)
          .single();

        if (userError) {
          console.error('Error checking subscription:', userError);
          setHasActiveSubscription(false);
        } else {
          setHasActiveSubscription(userData?.plan_id !== null);
        }

        // Get restaurant count
        const { data: restaurants, error: restaurantError } = await supabase
          .from('restaurants')
          .select('id')
          .eq('owner_id', user.id);

        if (restaurantError) {
          console.error('Error counting restaurants:', restaurantError);
          setRestaurantCount(0);
        } else {
          setRestaurantCount(restaurants?.length || 0);
        }

      } catch (error) {
        console.error('Error in checkSubscription:', error);
        setHasActiveSubscription(false);
        setRestaurantCount(0);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  return {
    hasActiveSubscription,
    restaurantCount,
    loading,
    canCreateRestaurant: hasActiveSubscription && restaurantCount === 0,
    hasReachedLimit: restaurantCount >= 1
  };
}

// Utility function to handle payment required scenarios
export function getPaymentRequiredMessage(hasActiveSubscription, restaurantCount) {
  if (!hasActiveSubscription) {
    return {
      title: '🔒 Необходим е активен план',
      message: 'За да използвате платформата, моля изберете план и извършете плащане.',
      action: 'Изберете план',
      actionLink: '/#pricing'
    };
  }

  if (restaurantCount >= 1) {
    return {
      title: '🏪 Достигнат лимит на ресторанти',
      message: 'Можете да имате само един ресторант на профил. За повече ресторанти, моля свържете се с нас.',
      action: 'Управлявайте ресторанта',
      actionLink: '/dashboard/restaurants'
    };
  }

  return null;
} 