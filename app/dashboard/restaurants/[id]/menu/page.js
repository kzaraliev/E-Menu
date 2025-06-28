'use client'

import { useAuth } from '@/lib/auth-context'
import { useSubscription, getPaymentRequiredMessage } from '@/lib/payment-protection'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { AVAILABLE_LANGUAGES, getTranslation } from '@/lib/languages'

export default function MenuManagementPage() {
  const { user } = useAuth()
  const params = useParams()
  const { hasActiveSubscription, restaurantCount, loading: subscriptionLoading } = useSubscription(user)
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddCategory, setShowAddCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('bg')
  const [translationModal, setTranslationModal] = useState({
    isOpen: false,
    type: null, // 'category' or 'item'
    item: null,
    translationName: '',
    translationDescription: ''
  })

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

      // Fetch categories with menu items and translations
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select(`
          *,
          category_translations (
            language_code, name
          ),
          menu_items (
            *,
            menu_item_variants (*),
            menu_item_translations (
              language_code, name, description
            )
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

  useEffect(() => {
    if (user && params.id) {
      fetchData()
    }
  }, [user, params.id])

  // Show payment required message if needed
  const canEdit = hasActiveSubscription && restaurant && subscriptionLoading === false

  if (subscriptionLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show warning if user cannot edit (no subscription)
  if (!canEdit && restaurant) {
    return (
      <div className="px-4 py-6 sm:px-0">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Управлението на менюто е ограничено
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              За да управлявате менюто, ви е необходим активен план.
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
                href="/dashboard/restaurants"
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Назад към ресторанти
              </Link>
            </div>
          </div>

          {/* Show read-only view of the menu */}
          {restaurant && (
            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Преглед на меню за "{restaurant.name}" (само за четене)
              </h3>
              {categories.length === 0 ? (
                <p className="text-gray-500">Няма добавени категории</p>
              ) : (
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900">{getCategoryName(category)}</h4>
                      {category.menu_items?.length > 0 ? (
                        <div className="mt-2 space-y-2">
                          {category.menu_items.map((item) => (
                            <div key={item.id} className="text-sm text-gray-600 pl-4">
                              • {getItemName(item)}
                              {item.menu_item_variants?.map((variant) => (
                                <span key={variant.id} className="ml-2 text-green-600">
                                  ({variant.name}: {variant.price} лв.)
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 mt-2">Няма добавени продукти</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Helper functions for translations
  const getCategoryName = (category) => {
    return getTranslation(category, category.category_translations, 'name', selectedLanguage)
  }

  const getItemName = (item) => {
    return getTranslation(item, item.menu_item_translations, 'name', selectedLanguage)
  }

  const getItemDescription = (item) => {
    return getTranslation(item, item.menu_item_translations, 'description', selectedLanguage)
  }

  // Translation modal functions
  const openTranslationModal = (type, item) => {
    const currentLang = selectedLanguage
    let name = ''
    let description = ''

    if (type === 'category') {
      const translation = item.category_translations?.find(t => t.language_code === currentLang)
      name = translation?.name || ''
    } else if (type === 'item') {
      const translation = item.menu_item_translations?.find(t => t.language_code === currentLang)
      name = translation?.name || ''
      description = translation?.description || ''
    }

    setTranslationModal({
      isOpen: true,
      type,
      item,
      translationName: name,
      translationDescription: description
    })
  }

  const closeTranslationModal = () => {
    setTranslationModal({
      isOpen: false,
      type: null,
      item: null,
      translationName: '',
      translationDescription: ''
    })
  }

  const saveTranslation = async () => {
    const { type, item, translationName, translationDescription } = translationModal
    
    try {
      if (type === 'category') {
        // Check if translation exists
        const existingTranslation = item.category_translations?.find(t => t.language_code === selectedLanguage)
        
        if (existingTranslation) {
          // Update existing translation
          const { error } = await supabase
            .from('category_translations')
            .update({ name: translationName })
            .eq('category_id', item.id)
            .eq('language_code', selectedLanguage)
          
          if (error) throw error
        } else {
          // Create new translation
          const { error } = await supabase
            .from('category_translations')
            .insert([{
              category_id: item.id,
              language_code: selectedLanguage,
              name: translationName
            }])
          
          if (error) throw error
        }
      } else if (type === 'item') {
        // Check if translation exists
        const existingTranslation = item.menu_item_translations?.find(t => t.language_code === selectedLanguage)
        
        if (existingTranslation) {
          // Update existing translation
          const { error } = await supabase
            .from('menu_item_translations')
            .update({ 
              name: translationName,
              description: translationDescription 
            })
            .eq('menu_item_id', item.id)
            .eq('language_code', selectedLanguage)
          
          if (error) throw error
        } else {
          // Create new translation
          const { error } = await supabase
            .from('menu_item_translations')
            .insert([{
              menu_item_id: item.id,
              language_code: selectedLanguage,
              name: translationName,
              description: translationDescription
            }])
          
          if (error) throw error
        }
      }

      // Refresh data to show new translations
      await fetchData()
      closeTranslationModal()
    } catch (err) {
      setError('Грешка при запазването на превода: ' + err.message)
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
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Език:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                {AVAILABLE_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} - {lang.name}
                  </option>
                ))}
              </select>
            </div>
            
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
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {getCategoryName(category)}
                    </h3>
                    {selectedLanguage !== 'bg' && (
                      <p className="text-sm text-gray-500">
                        Оригинал: {category.name}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-3">
                    {selectedLanguage !== 'bg' && (
                      <button
                        onClick={() => openTranslationModal('category', category)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        🌐 {getCategoryName(category) === category.name ? 'Добави превод' : 'Редактирай превод'}
                      </button>
                    )}
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
                          <h4 className="font-medium text-gray-900">{getItemName(item)}</h4>
                          {selectedLanguage !== 'bg' && getItemName(item) !== item.name && (
                            <p className="text-xs text-gray-500">Оригинал: {item.name}</p>
                          )}
                          {getItemDescription(item) && (
                            <p className="text-sm text-gray-600 mt-1">{getItemDescription(item)}</p>
                          )}
                          {selectedLanguage !== 'bg' && getItemDescription(item) !== item.description && item.description && (
                            <p className="text-xs text-gray-500">Оригинал описание: {item.description}</p>
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
                          {selectedLanguage !== 'bg' && (
                            <button
                              onClick={() => openTranslationModal('item', item)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              🌐 {getItemName(item) === item.name ? 'Добави превод' : 'Редактирай превод'}
                            </button>
                          )}
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

      {/* Translation Modal */}
      {translationModal.isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Превод на {AVAILABLE_LANGUAGES.find(l => l.code === selectedLanguage)?.name}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {translationModal.type === 'category' ? 'Име на категорията' : 'Име на артикула'}
                  </label>
                  <input
                    type="text"
                    value={translationModal.translationName}
                    onChange={(e) => setTranslationModal(prev => ({
                      ...prev,
                      translationName: e.target.value
                    }))}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Въведете ${translationModal.type === 'category' ? 'име на категорията' : 'име на артикула'} на ${AVAILABLE_LANGUAGES.find(l => l.code === selectedLanguage)?.name}`}
                  />
                </div>

                {translationModal.type === 'item' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Описание (незадължително)
                    </label>
                    <textarea
                      value={translationModal.translationDescription}
                      onChange={(e) => setTranslationModal(prev => ({
                        ...prev,
                        translationDescription: e.target.value
                      }))}
                      rows={3}
                      className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Въведете описание на ${AVAILABLE_LANGUAGES.find(l => l.code === selectedLanguage)?.name}`}
                    />
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">
                    <strong>Оригинал:</strong>
                  </p>
                  <p className="text-sm font-medium">
                    {translationModal.type === 'category' ? translationModal.item?.name : translationModal.item?.name}
                  </p>
                  {translationModal.type === 'item' && translationModal.item?.description && (
                    <p className="text-sm text-gray-600 mt-1">
                      {translationModal.item.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeTranslationModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Отказ
                </button>
                <button
                  onClick={saveTranslation}
                  disabled={!translationModal.translationName.trim()}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-md"
                >
                  Запази превод
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 