'use client'

import { useAuth } from '@/lib/auth-context'
import { useSubscription, getPaymentRequiredMessage } from '@/lib/payment-protection'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewRestaurantPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { hasActiveSubscription, restaurantCount, loading: subscriptionLoading, canCreateRestaurant } = useSubscription(user)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    address: '',
    phone: '',
    website: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [slugError, setSlugError] = useState('')

  // Show payment required message if needed
  const paymentMessage = getPaymentRequiredMessage(hasActiveSubscription, restaurantCount)
  if (paymentMessage || subscriptionLoading) {
    if (subscriptionLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {paymentMessage.title}
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              {paymentMessage.message}
            </p>
            <Link
              href={paymentMessage.actionLink}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              {paymentMessage.action}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Block creation if user can't create restaurant (even with subscription)
  if (!canCreateRestaurant) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Лимит достигнат
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Вече имате максималния брой ресторанти за вашия план.
            </p>
            <Link
              href="/dashboard/restaurants"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
            >
              Назад към ресторанти
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Generate slug from restaurant name
  const generateSlug = (name) => {
    const cyrillicToLatin = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
      'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a', 'ь': 'y',
      'ю': 'yu', 'я': 'ya'
    }
    
    return name
      .toLowerCase()
      .split('')
      .map(char => cyrillicToLatin[char] || char)
      .join('')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    const slug = generateSlug(name)
    setFormData(prev => ({
      ...prev,
      name,
      slug
    }))
    setSlugError('')
  }

  const handleSlugChange = (e) => {
    const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
    setFormData(prev => ({
      ...prev,
      slug
    }))
    setSlugError('')
  }

  const checkSlugAvailability = async (slug) => {
    if (!slug) return false
    
    const { data, error } = await supabase
      .from('restaurants')
      .select('id')
      .eq('slug', slug)
      .limit(1)

    if (error) {
      console.error('Error checking slug:', error)
      return false
    }

    return data.length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('Името на ресторанта е задължително')
      }

      if (!formData.slug.trim()) {
        throw new Error('URL адресът е задължителен')
      }

      // Check slug availability
      const isSlugAvailable = await checkSlugAvailability(formData.slug)
      if (!isSlugAvailable) {
        setSlugError('Този URL адрес вече се използва. Моля изберете друг.')
        setLoading(false)
        return
      }

      // Create restaurant
      const { data, error } = await supabase
        .from('restaurants')
        .insert([
          {
            name: formData.name.trim(),
            slug: formData.slug.trim(),
            description: formData.description.trim() || null,
            address: formData.address.trim() || null,
            phone: formData.phone.trim() || null,
            website: formData.website.trim() || null,
            owner_id: user.id,
            default_language: 'bg'
          }
        ])
        .select()

      if (error) throw error

      // Redirect to restaurants list
      router.push('/dashboard/restaurants')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Добави нов ресторант
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Създайте цифрово меню за вашия ресторант. Всеки ресторант ще получи уникален URL адрес.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <div className="text-red-700">{error}</div>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Име на ресторанта *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="напр. Ресторант Калина"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                    URL адрес *
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      e-menu.bg/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      required
                      value={formData.slug}
                      onChange={handleSlugChange}
                      className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder="restourant-kalina"
                    />
                  </div>
                  {slugError && (
                    <p className="mt-2 text-sm text-red-600">{slugError}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Използвайте само малки букви, цифри и тирета. Автоматично се генерира от името.
                  </p>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Описание (опционално)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Кратко описание на ресторанта..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Адрес (опционално)
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="ул. Витоша 1, София"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Телефон (опционално)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="0888 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Уебсайт (опционално)
                  </label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
                <Link
                  href="/dashboard/restaurants"
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Отказ
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Запазване...' : 'Създай ресторант'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 