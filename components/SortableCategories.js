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
      <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 truncate">
              {getCategoryName(category)}
            </h3>
            {selectedLanguage !== 'bg' && (
              <p className="text-sm text-gray-500 truncate">
                Оригинал: {category.name}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            {selectedLanguage !== 'bg' && (
              <button
                onClick={() => openTranslationModal('category', category)}
                className="text-blue-600 hover:text-blue-800 text-sm self-start sm:self-auto"
              >
                🌐 {getCategoryName(category) === category.name ? 'Добави превод' : 'Редактирай превод'}
              </button>
            )}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-500 whitespace-nowrap">
                {category.menu_items?.length || 0} артикула
              </span>
              <button
                onClick={() => handleDeleteCategory(category.id, category.name)}
                className="text-red-600 hover:text-red-800 text-sm whitespace-nowrap"
              >
                🗑️ Изтрий
              </button>
            </div>
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