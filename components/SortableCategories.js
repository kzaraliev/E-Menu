import SortableList from './SortableList'

export default function SortableCategories({ 
  categories, 
  onReorderCategory, 
  getCategoryName,
  selectedLanguage,
  openTranslationModal,
  handleDeleteCategory,
  children 
}) {
  const handleReorder = async (categoryId, newOrder) => {
    try {
      await onReorderCategory(categoryId, newOrder)
    } catch (error) {
      console.error('Error reordering category:', error)
    }
  }

  const renderCategory = (category) => (
    <div className="bg-white shadow rounded-lg overflow-hidden">
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

      {/* Category Content - this will include the menu items */}
      {children && children(category)}
    </div>
  )

  return (
    <SortableList
      items={categories}
      onReorder={handleReorder}
      renderItem={renderCategory}
      className="space-y-6"
      itemClassName="bg-transparent"
    />
  )
} 