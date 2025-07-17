'use client'

import { useAuth } from '@/lib/auth-context'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function NewMenuItemPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: searchParams.get('category') || '',
    image_url: ''
  })
  const [variants, setVariants] = useState([
    { name: '', price: '', is_default: true }
  ])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && params.id) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, params.id])

  const fetchData = async () => {
    try {
      // Fetch restaurant info
      const { data: restaurantData, error: restaurantError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', params.id)
        .eq('owner_id', user.id)
        .single()

      if (restaurantError) throw restaurantError
      setRestaurant(restaurantData)

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('restaurant_id', params.id)
        .order('sort_order', { ascending: true })

      if (categoriesError) throw categoriesError
      setCategories(categoriesData || [])
    } catch (err) {
      setError('Грешка при зареждането: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const addVariant = () => {
    setVariants([...variants, { name: '', price: '', is_default: false }])
  }

  const removeVariant = (index) => {
    if (variants.length > 1) {
      const newVariants = variants.filter((_, i) => i !== index)
      // Ensure at least one variant is default
      if (!newVariants.some(v => v.is_default)) {
        newVariants[0].is_default = true
      }
      setVariants(newVariants)
    }
  }

  const updateVariant = (index, field, value) => {
    const newVariants = [...variants]
    newVariants[index][field] = value
    
    // If setting this as default, unset others
    if (field === 'is_default' && value) {
      newVariants.forEach((variant, i) => {
        if (i !== index) variant.is_default = false
      })
    }
    
    setVariants(newVariants)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.name.trim()) {
        throw new Error('Името на артикула е задължително')
      }

      if (!formData.category_id) {
        throw new Error('Моля изберете категория')
      }

      // Validate variants
      const validVariants = variants.filter(v => v.name.trim() && v.price.trim())
      if (validVariants.length === 0) {
        throw new Error('Моля добавете поне един вариант с име и цена')
      }

      // Ensure at least one variant is default
      if (!validVariants.some(v => v.is_default)) {
        validVariants[0].is_default = true
      }

      // Create menu item
      const { data: menuItemData, error: menuItemError } = await supabase
        .from('menu_items')
        .insert([
          {
            name: formData.name.trim(),
            description: formData.description.trim() || null,
            category_id: formData.category_id,
            restaurant_id: params.id,
            image_url: formData.image_url.trim() || null,
            sort_order: 0 // Will be updated later with proper ordering
          }
        ])
        .select()
        .single()

      if (menuItemError) throw menuItemError

      // Create variants
      const variantsToInsert = validVariants.map(variant => ({
        menu_item_id: menuItemData.id,
        name: variant.name.trim(),
        price: parseFloat(variant.price),
        is_default: variant.is_default
      }))

      const { error: variantsError } = await supabase
        .from('menu_item_variants')
        .insert(variantsToInsert)

      if (variantsError) throw variantsError

      // Redirect back to menu management
      router.push(`/dashboard/restaurants/${params.id}/menu`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600">Ресторантът не е намерен или нямате достъп до него.</div>
        <Link href="/dashboard/restaurants" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          ← Назад към ресторанти
        </Link>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Добави артикул в менюто
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Добавете нов артикул към менюто на {restaurant.name}. Можете да зададете различни варианти (размери, порции) с различни цени.
            </p>
          </div>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="shadow-lg sm:rounded-xl sm:overflow-hidden bg-white">
              <div className="px-6 py-8 space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-red-700 font-medium">{error}</div>
                  </div>
                )}

                {/* Basic Info */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-3">
                    Име на артикула *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="напр. Пица Маргарита"
                  />
                </div>

                <div>
                  <label htmlFor="category_id" className="block text-sm font-semibold text-gray-900 mb-3">
                    Категория *
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                  >
                    <option value="" className="text-gray-600">Изберете категория</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    className="w-full px-4 py-3 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                    placeholder="Кратко описание на артикула, съставки..."
                  />
                </div>

                <div>
                  <label htmlFor="image_url" className="block text-sm font-semibold text-gray-900 mb-3">
                    Снимка URL (опционално)
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    За сега използвайте външни URL-и. Image upload ще добавим скоро.
                  </p>
                </div>

                {/* Variants Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Варианти и цени *
                  </label>
                  <div className="space-y-4">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Размер/Вариант (напр. Малка, Голяма)"
                            value={variant.name}
                            onChange={(e) => updateVariant(index, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                          />
                        </div>
                        <div className="w-28">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Цена"
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 placeholder-gray-600 text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="default_variant"
                            checked={variant.is_default}
                            onChange={(e) => updateVariant(index, 'is_default', e.target.checked)}
                            className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                          />
                          <label className="ml-2 text-sm text-gray-700">
                            По подразбиране
                          </label>
                        </div>
                        {variants.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeVariant(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addVariant}
                    className="mt-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    ➕ Добави вариант
                  </button>
                  <p className="mt-2 text-sm text-gray-500">
                    Примери: &quot;300 гр.&quot; - 8.50 лв, &quot;500 гр.&quot; - 12.90 лв или просто &quot;Порция&quot; - 15.00 лв
                  </p>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
                <Link
                  href={`/dashboard/restaurants/${params.id}/menu`}
                  className="bg-white py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Отказ
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {saving ? 'Запазване...' : 'Добави артикул'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 