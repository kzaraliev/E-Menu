import SortableList from './SortableList'
import Link from 'next/link'

export default function SortableMenuItems({ 
  menuItems, 
  onReorderItem, 
  getItemName,
  getItemDescription,
  selectedLanguage,
  openTranslationModal,
  restaurantId,
  categoryId 
}) {
  const handleReorder = async (itemId, newOrder) => {
    try {
      await onReorderItem(itemId, newOrder)
    } catch (error) {
      console.error('Error reordering menu item:', error)
    }
  }

  const renderMenuItem = (item) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
          href={`/dashboard/restaurants/${restaurantId}/menu/items/${item.id}/edit`}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ✏️ Редактирай
        </Link>
      </div>
    </div>
  )

  if (!menuItems || menuItems.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-2xl mb-2">🍽️</div>
        <p className="text-gray-500 mb-4">Няма артикули в тази категория</p>
        <Link
          href={`/dashboard/restaurants/${restaurantId}/menu/items/new?category=${categoryId}`}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
        >
          ➕ Добави първия артикул
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SortableList
        items={menuItems}
        onReorder={handleReorder}
        renderItem={renderMenuItem}
        itemClassName="mb-2"
      />
      <div className="pt-4 border-t border-gray-200">
        <Link
          href={`/dashboard/restaurants/${restaurantId}/menu/items/new?category=${categoryId}`}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          ➕ Добави артикул
        </Link>
      </div>
    </div>
  )
} 