'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useParams } from 'next/navigation'
import { AVAILABLE_LANGUAGES, getTranslation } from '@/lib/languages'

export default function PublicMenuPage() {
  const params = useParams()
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('bg')
  const [availableLanguagesForRestaurant, setAvailableLanguagesForRestaurant] = useState([])
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false)

  useEffect(() => {
    if (params.slug) {
      fetchMenuData()
    }
  }, [params.slug])

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

  const fetchMenuData = async () => {
    try {
      setLoading(true)

      // Fetch restaurant by slug
      const { data: restaurantData, error: restaurantError } = await supabase
        .from('restaurants')
        .select('*')
        .eq('slug', params.slug)
        .single()

      if (restaurantError || !restaurantData) {
        setError('Ресторантът не е намерен')
        return
      }

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
        .eq('restaurant_id', restaurantData.id)
        .order('sort_order', { ascending: true })

      if (categoriesError) throw categoriesError

      // Filter out categories without items for public view
      const categoriesWithItems = categoriesData?.filter(category => 
        category.menu_items && category.menu_items.length > 0
      ) || []

      setCategories(categoriesWithItems)

      // Determine available languages for this restaurant
      const availableLanguages = new Set(['bg']) // Bulgarian is always available
      
      // Check for category translations
      categoriesWithItems.forEach(category => {
        category.category_translations?.forEach(translation => {
          availableLanguages.add(translation.language_code)
        })
        
        // Check for menu item translations
        category.menu_items?.forEach(item => {
          item.menu_item_translations?.forEach(translation => {
            availableLanguages.add(translation.language_code)
          })
        })
      })

      // Convert to array and filter available languages
      const restaurantLanguages = AVAILABLE_LANGUAGES.filter(lang => 
        availableLanguages.has(lang.code)
      )

      setAvailableLanguagesForRestaurant(restaurantLanguages)
      setShowLanguageSwitcher(restaurantLanguages.length > 1)
      
      // Reset to Bulgarian if current language is not available
      if (!availableLanguages.has(selectedLanguage)) {
        setSelectedLanguage('bg')
      }
    } catch (err) {
      setError('Грешка при зареждането на менюто: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Зареждане на менюто...</p>
        </div>
      </div>
    )
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ресторантът не е намерен</h1>
          <p className="text-gray-600 mb-6">{error || 'Моля, проверете адреса и опитайте отново.'}</p>
          <a 
            href="https://e-menu.bg" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Към e-menu.bg
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
              {restaurant.description && (
                <p className="mt-2 text-gray-600">{restaurant.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                {restaurant.address && (
                  <span className="flex items-center">
                    📍 {restaurant.address}
                  </span>
                )}
                {restaurant.phone && (
                  <span className="flex items-center">
                    📞 {restaurant.phone}
                  </span>
                )}
                {restaurant.website && (
                  <a 
                    href={restaurant.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    🌐 Уебсайт
                  </a>
                )}
              </div>
            </div>

            {/* Language Switcher - Only show if multiple languages available */}
            {showLanguageSwitcher && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Език:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="text-sm border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                                     {availableLanguagesForRestaurant.map((lang) => (
                     <option key={lang.code} value={lang.code}>
                       {lang.flag} - {lang.name}
                     </option>
                   ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Менюто се подготвя</h2>
            <p className="text-gray-600">Скоро ще можете да видите нашите предложения тук.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getCategoryName(category)}
                  </h2>
                </div>

                {/* Menu Items */}
                <div className="p-6">
                  <div className="grid gap-6 md:grid-cols-1">
                    {category.menu_items
                      ?.filter(item => item.menu_item_variants && item.menu_item_variants.length > 0)
                      ?.map((item) => (
                      <div key={item.id} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {getItemName(item)}
                          </h3>
                          {getItemDescription(item) && (
                            <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                              {getItemDescription(item)}
                            </p>
                          )}
                          
                          {/* Image placeholder */}
                          {item.image_url && (
                            <div className="mt-3">
                              <img 
                                src={item.image_url} 
                                alt={getItemName(item)}
                                className="w-20 h-20 object-cover rounded-md"
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Prices */}
                        <div className="ml-4 text-right">
                          {item.menu_item_variants?.map((variant) => (
                            <div key={variant.id} className="mb-1">
                              <div className="flex items-center justify-end space-x-2">
                                {item.menu_item_variants.length > 1 && (
                                  <span className="text-sm text-gray-500">{variant.name}:</span>
                                )}
                                <span className="text-lg font-bold text-green-600">
                                  {variant.price} лв.
                                </span>
                                {variant.is_default && item.menu_item_variants.length > 1 && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                    Стандартен
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-500">
            Powered by{' '}
            <a 
              href="https://e-menu.bg" 
              className="text-blue-600 hover:text-blue-800 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              e-menu.bg
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 