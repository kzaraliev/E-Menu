'use client'

import { useAuth } from '@/lib/auth-context'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function MenuManagementPage() {
  const { user } = useAuth()
  const params = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')

  useEffect(() => {
    if (user && params.id) {
      fetchData()
    }
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

      // Fetch categories with menu items
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          menu_items (
            *,
            menu_item_variants (*)
          )
        `)
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

  const handleAddCategory = async (e) => {
    e.preventDefault()
    if (!newCategoryName.trim()) return

    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([
          {
            name: newCategoryName.trim(),
            restaurant_id: params.id,
            sort_order: categories.length
          }
        ])
        .select()

      if (error) throw error
      
      // Add to local state
      setCategories([...categories, { ...data[0], menu_items: [] }])
      setNewCategoryName('')
      setShowAddCategory(false)
    } catch (err) {
      setError('Грешка при добавянето: ' + err.message)
    }
  }

  const handleDeleteCategory = async (categoryId, categoryName) => {
    if (!confirm(`Сигурни ли сте, че искате да изтриете категорията "${categoryName}"? Всички артикули в нея също ще бъдат изтрити.`)) {
      return
    }

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId)

      if (error) throw error
      
      // Remove from local state
      setCategories(categories.filter(c => c.id !== categoryId))
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
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Меню на {restaurant.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Управлявайте категориите и артикулите в менюто
            </p>
          </div>
          <div className="flex space-x-3">
            <Link
              href={`/${restaurant.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              👁️ Прегледай менюто
            </Link>
            <Link
              href="/dashboard/restaurants"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Назад
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-red-700">{error}</div>
        </div>
      )}

      {/* Categories */}
      <div className="space-y-6">
        {categories.length === 0 && !showAddCategory ? (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-gray-400 text-4xl mb-4">📂</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Няма създадени категории
            </h3>
            <p className="text-gray-500 mb-6">
              Започнете с добавяне на първата категория към менюто.
            </p>
            <button
              onClick={() => setShowAddCategory(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              ➕ Добави първата категория
            </button>
          </div>
        ) : categories.length === 0 && showAddCategory ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Добави първата категория</h3>
            <form onSubmit={handleAddCategory} className="flex items-center space-x-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Име на категорията (напр. Салати)"
                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              <button
                type="submit"
                disabled={!newCategoryName.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                Добави
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddCategory(false)
                  setNewCategoryName('')
                }}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Отказ
              </button>
            </form>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="bg-white shadow rounded-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    {category.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500">
                      {category.menu_items?.length || 0} артикула
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(category.id, category.name)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      🗑️ Изтрий
                    </button>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-6">
                {category.menu_items?.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-2xl mb-2">🍽️</div>
                    <p className="text-gray-500 mb-4">Няма артикули в тази категория</p>
                    <Link
                      href={`/dashboard/restaurants/${params.id}/menu/items/new?category=${category.id}`}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      ➕ Добави първия артикул
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {category.menu_items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          )}
                          <div className="mt-2 flex items-center space-x-4">
                            {item.menu_item_variants?.map((variant) => (
                              <span key={variant.id} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {variant.name}: {variant.price} лв.
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            href={`/dashboard/restaurants/${params.id}/menu/items/${item.id}/edit`}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            ✏️ Редактирай
                          </Link>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-200">
                      <Link
                        href={`/dashboard/restaurants/${params.id}/menu/items/new?category=${category.id}`}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        ➕ Добави артикул
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {/* Add Category Section */}
        {categories.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6">
            {showAddCategory ? (
              <form onSubmit={handleAddCategory} className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Име на категорията (напр. Салати)"
                  className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  disabled={!newCategoryName.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  Добави
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCategory(false)
                    setNewCategoryName('')
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Отказ
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowAddCategory(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                ➕ Добави нова категория
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 