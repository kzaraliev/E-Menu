'use client'

import { useAuth } from '@/lib/auth-context'
import { useSubscription } from '@/lib/payment-protection'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import QRCodeGenerator from './components/QRCodeGenerator'
import Pricing from '@/components/Pricing'

export default function QRGeneratorPage() {
  const { user } = useAuth()
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription(user)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRestaurants = async () => {
    try {
      const { data: restaurants, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)

      if (error) throw error
      setRestaurants(restaurants || [])
    } catch (error) {
      console.error('Error fetching restaurants:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRestaurants()
    }
  }, [user])

  if (loading || subscriptionLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show pricing if user doesn't have active subscription
  if (!hasActiveSubscription) {
    return <Pricing />
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                🔗 QR Code Генератор
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Създайте QR кодове за менютата на вашите ресторанти или WiFi настройки
              </p>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ← Назад към Dashboard
            </Link>
          </div>
        </div>

        {/* QR Generator Component */}
        <QRCodeGenerator restaurants={restaurants} />
      </div>
    </div>
  );
}