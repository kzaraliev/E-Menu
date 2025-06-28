'use client'

import { useAuth } from '@/lib/auth-context'
import { useSubscription, getPaymentRequiredMessage } from '@/lib/payment-protection'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function RestaurantsPage() {
  const { user } = useAuth()
  const { hasActiveSubscription, restaurantCount, loading: subscriptionLoading, canCreateRestaurant } = useSubscription(user)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRestaurants = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRestaurants(data || [])
    } catch (err) {
      setError('Грешка при зареждането на ресторантите: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      fetchRestaurants()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const handleDelete = async (restaurantId, restaurantName) => {
    if (!confirm(`Сигурни ли сте, че искате да изтриете "${restaurantName}"? Това действие е необратимо.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('restaurants')
        .delete()
        .eq('id', restaurantId)

      if (error) throw error
      
      // Remove from local state
      setRestaurants(restaurants.filter(r => r.id !== restaurantId))
    } catch (err) {
      setError('Грешка при изтриването: ' + err.message)
    }
  }

  if (loading || subscriptionLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Ресторанти</h1>
          <p className="mt-2 text-sm text-gray-700">
            Управлявайте вашите ресторанти и техните цифрови менюта.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {canCreateRestaurant ? (
            <Link
              href="/dashboard/restaurants/new"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              ➕ Добави ресторант
            </Link>
          ) : (
            <div className="text-sm text-gray-500">
              {hasActiveSubscription ? 'Лимит достигнат (1/1)' : 'Изисква се активен план'}
            </div>
          )}
        </div>
      </div>

      {!hasActiveSubscription && restaurants.length > 0 && (
        <div className="mt-4 bg-orange-50 border border-orange-200 rounded-md p-4">
          <div className="flex">
            <div className="text-orange-700">
              ⚠️ Планът ви е изтекъл. Ресторантите са деактивирани до възобновяване на плащанията.{' '}
              <Link href="/pricing" className="underline hover:text-orange-800">
                Възобновете плана
              </Link>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">{error}</div>
        </div>
      )}

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {restaurants.length === 0 ? (
                <div className="bg-white px-4 py-12 text-center">
                  <div className="text-gray-400 text-4xl mb-4">🏪</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Няма създадени ресторанти
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {canCreateRestaurant 
                      ? 'Започнете с добавяне на вашия първи ресторант.'
                      : hasActiveSubscription 
                        ? 'Вече имате максималния брой ресторанти за вашия план.'
                        : 'Изберете план за да създадете ресторант.'
                    }
                  </p>
                  {canCreateRestaurant && (
                    <Link
                      href="/dashboard/restaurants/new"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                      ➕ Добави първия ресторант
                    </Link>
                  )}
                  {!hasActiveSubscription && (
                    <Link
                      href="/pricing"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
                    >
                      Изберете план
                    </Link>
                  )}
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ресторант
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Статус
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Създаден
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Действия</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {restaurants.map((restaurant) => {
                      const canManage = hasActiveSubscription && restaurant.is_active
                      return (
                        <tr key={restaurant.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {restaurant.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              restaurant.is_active 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {restaurant.is_active ? '✅ Активен' : '❌ Неактивен'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-blue-600">
                              {restaurant.is_active ? (
                                <Link 
                                  href={`/${restaurant.slug}`} 
                                  className="hover:text-blue-800"
                                >
                                  e-menu.bg/{restaurant.slug}
                                </Link>
                              ) : (
                                <span className="text-gray-400">
                                  e-menu.bg/{restaurant.slug} (недостъпен)
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(restaurant.created_at).toLocaleDateString('bg-BG')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              {canManage ? (
                                <>
                                  <Link
                                    href={`/dashboard/restaurants/${restaurant.id}/edit`}
                                    className="text-blue-600 hover:text-blue-900"
                                  >
                                    ✏️ Редактирай
                                  </Link>
                                  <Link
                                    href={`/dashboard/restaurants/${restaurant.id}/menu`}
                                    className="text-green-600 hover:text-green-900"
                                  >
                                    📝 Меню
                                  </Link>
                                  <button
                                    onClick={() => handleDelete(restaurant.id, restaurant.name)}
                                    className="text-red-600 hover:text-red-900"
                                  >
                                    🗑️ Изтрий
                                  </button>
                                </>
                              ) : (
                                <span className="text-gray-400 text-xs">
                                  {!hasActiveSubscription ? 'Изисква план' : 'Неактивен'}
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 