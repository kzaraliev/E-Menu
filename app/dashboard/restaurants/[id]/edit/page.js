'use client'

import { useAuth } from '@/lib/auth-context'
import { useSubscription, getPaymentRequiredMessage } from '@/lib/payment-protection'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditRestaurantPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const { hasActiveSubscription, restaurantCount, loading: subscriptionLoading } = useSubscription(user)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    address: '',
    phone: '',
    website: ''
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [slugError, setSlugError] = useState('')

  const fetchRestaurant = async () => {
    try {
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', params.id)
        .eq('owner_id', user.id)
        .single()

      if (error) throw error
      
      setFormData({
        name: data.name || '',
        slug: data.slug || '',
        description: data.description || '',
        address: data.address || '',
        phone: data.phone || '',
        website: data.website || ''
      })
    } catch (err) {
      setError('Грешка при зареждането: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && params.id) {
      fetchRestaurant()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, params.id])

  // Generate slug from restaurant name (same as in new page)
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
    setFormData(prev => {
      const newData = { ...prev, name }
      
      // Auto-generate slug only if current slug is empty or auto-generated
      // This prevents overwriting user's custom slug
      if (!prev.slug.trim() || prev.slug === generateSlug(prev.name)) {
        newData.slug = generateSlug(name)
      }
      
      return newData
    })
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
      .neq('id', params.id) // Exclude current restaurant
      .limit(1)

    if (error) {
      console.error('Error checking slug:', error)
      return false
    }

    return data.length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('Името на ресторанта е задължително')
      }

      if (!formData.slug.trim()) {
        throw new Error('URL адресът е задължителен')
      }

      // Check slug availability (excluding current restaurant)
      const isSlugAvailable = await checkSlugAvailability(formData.slug)
      if (!isSlugAvailable) {
        setSlugError('Този URL адрес вече се използва. Моля изберете друг.')
        setSaving(false)
        return
      }

      // Update restaurant
      const { error } = await supabase
        .from('restaurants')
        .update({
          name: formData.name.trim(),
          slug: formData.slug.trim(),
          description: formData.description.trim() || null,
          address: formData.address.trim() || null,
          phone: formData.phone.trim() || null,
          website: formData.website.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .eq('owner_id', user.id)

      if (error) throw error

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  // Check if user can edit this restaurant
  const canEdit = hasActiveSubscription && formData.name && subscriptionLoading === false

  // Show loading while fetching subscription info or restaurant data
  if (loading || subscriptionLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show warning if user cannot edit (no subscription or inactive restaurant)
  if (!canEdit && formData.name) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Редактирането е ограничено
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              За да редактирате ресторанта, ви е необходим активен план.
            </p>
            <div className="space-y-4">
              <Link
                href="/pricing"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                Изберете план
              </Link>
              <br/>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Назад към Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-4 sm:py-6 lg:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h3 className="text-xl sm:text-2xl font-medium leading-6 text-gray-900">
            Редактирай ресторант
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Редактирайте информацията за вашия ресторант.
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="shadow-lg sm:rounded-xl sm:overflow-hidden bg-white">
              <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-700 font-medium">{error}</div>
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                    Име на ресторанта *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="напр. Ресторант Калина"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-3">
                    URL адрес *
                  </label>
                  <div className="flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 sm:px-6 py-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-600 text-xs sm:text-sm font-medium whitespace-nowrap">
                      e-menu.bg/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      required
                      value={formData.slug}
                      onChange={handleSlugChange}
                      className="flex-1 min-w-0 px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="restourant-kalina"
                    />
                  </div>
                  {slugError && (
                    <p className="mt-2 text-sm text-red-600 font-medium">{slugError}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Използвайте само малки букви, цифри и тирета.
                  </p>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-3">
                    Описание (опционално)
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Кратко описание на ресторанта..."
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-3">
                      Адрес (опционално)
                    </label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="ул. Витоша 1, София"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 mb-3">
                      Телефон (опционално)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="0888 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-3">
                    Уебсайт (опционално)
                  </label>
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="https://www.example.com"
                  />
                </div>
              </div>
              <div className="px-4 sm:px-6 py-4 bg-gray-50 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3">
                <Link
                  href="/dashboard"
                  className="w-full sm:w-auto inline-flex justify-center items-center bg-white py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Отказ
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {saving ? 'Запазване...' : 'Запази промените'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 