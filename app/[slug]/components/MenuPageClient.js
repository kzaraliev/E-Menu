'use client'

import { useState } from 'react'
import { getTranslation } from '@/lib/languages'
import useTheme from '../hooks/useTheme'
import MenuHeader from './MenuHeader'
import MenuContent from './MenuContent'
import MenuFooter from './MenuFooter'
import MenuItemModal from './MenuItemModal'

export default function MenuPageClient({ 
  restaurant, 
  categories, 
  availableLanguagesForRestaurant, 
  slug 
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('bg')
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isDarkMode, toggleTheme, themeClasses } = useTheme()
  
  const showLanguageSwitcher = availableLanguagesForRestaurant.length > 1

  // Handle item click to open modal
  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedItem(null)
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

  return (
    <div className={`min-h-screen ${themeClasses.background} transition-colors duration-300`}>
      <MenuHeader 
        restaurant={restaurant}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        availableLanguagesForRestaurant={availableLanguagesForRestaurant}
        showLanguageSwitcher={showLanguageSwitcher}
        themeClasses={themeClasses}
      />

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <MenuContent 
          categories={categories}
          getCategoryName={getCategoryName}
          getItemName={getItemName}
          getItemDescription={getItemDescription}
          themeClasses={themeClasses}
          onItemClick={handleItemClick}
        />
      </main>

      <MenuFooter themeClasses={themeClasses} />

      {/* Modal */}
      <MenuItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        getItemName={getItemName}
        getItemDescription={getItemDescription}
        themeClasses={themeClasses}
      />
    </div>
  )
} 