'use client'

import { useAuth } from '@/lib/auth-context'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function EditMenuItemPage() {
  const { user } = useAuth()
  const router = useRouter()
  const params = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '',
    image_url: ''
  })
  const [variants, setVariants] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user && params.id && params.itemId) {
      fetchData()
    }
  }, [user, params.id, params.itemId])

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

      // Fetch menu item with variants
      const { data: menuItemData, error: menuItemError } = await supabase
        .from('menu_items')
        .select(`
          *,
          menu_item_variants (*)
        `)
        .eq('id', params.itemId)
        .eq('restaurant_id', params.id)
        .single()

      if (menuItemError) throw menuItemError

      setFormData({
        name: menuItemData.name || '',
        description: menuItemData.description || '',
        category_id: menuItemData.category_id || '',
        image_url: menuItemData.image_url || ''
      })

      setVariants(menuItemData.menu_item_variants || [])
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
      const validVariants = variants.filter(v => v.name.trim() && v.price !== '')
      if (validVariants.length === 0) {
        throw new Error('Моля добавете поне един вариант с име и цена')
      }

      // Ensure at least one variant is default
      if (!validVariants.some(v => v.is_default)) {
        validVariants[0].is_default = true
      }

      // Update menu item
      const { error: menuItemError } = await supabase
        .from('menu_items')
        .update({
          name: formData.name.trim(),
          description: formData.description.trim() || null,
          category_id: formData.category_id,
          image_url: formData.image_url.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.itemId)

      if (menuItemError) throw menuItemError

      // Delete existing variants
      const { error: deleteError } = await supabase
        .from('menu_item_variants')
        .delete()
        .eq('menu_item_id', params.itemId)

      if (deleteError) throw deleteError

      // Create new variants
      const variantsToInsert = validVariants.map(variant => ({
        menu_item_id: params.itemId,
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

  const handleDelete = async () => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този артикул? Действието е необратимо.')) {
      return
    }

    try {
      const { error } = await supabase
        .from('menu_items')
        .delete()
        .eq('id', params.itemId)

      if (error) throw error

      router.push(`/dashboard/restaurants/${params.id}/menu`)
    } catch (err) {
      setError('Грешка при изтриването: ' + err.message)
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
              Редактирай артикул
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Редактирайте артикула от менюто на {restaurant.name}.
            </p>
            <div className="mt-6">
              <button
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                🗑️ Изтрий артикула
              </button>
            </div>
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

                {/* Basic Info */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Име на артикула *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="напр. Пица Маргарита"
                  />
                </div>

                <div>
                  <label htmlFor="category_id" className="block text-sm font-medium text-gray-700">
                    Категория *
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    required
                    value={formData.category_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="">Изберете категория</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
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
                    placeholder="Кратко описание на артикула, съставки..."
                  />
                </div>

                <div>
                  <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                    Снимка URL (опционално)
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                    className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Variants Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Варианти и цени *
                  </label>
                  <div className="space-y-3">
                    {variants.map((variant, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-md">
                        <div className="flex-1">
                          <input
                            type="text"
                            placeholder="Размер/Вариант (напр. Малка, Голяма)"
                            value={variant.name}
                            onChange={(e) => updateVariant(index, 'name', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                          />
                        </div>
                        <div className="w-24">
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="Цена"
                            value={variant.price}
                            onChange={(e) => updateVariant(index, 'price', e.target.value)}
                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 space-x-3">
                <Link
                  href={`/dashboard/restaurants/${params.id}/menu`}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Отказ
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
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