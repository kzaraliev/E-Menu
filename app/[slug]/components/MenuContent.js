import MenuCategory from './MenuCategory'
import EmptyMenu from './EmptyMenu'

export default function MenuContent({ 
  categories, 
  getCategoryName, 
  getItemName, 
  getItemDescription, 
  themeClasses,
  onItemClick 
}) {
  if (categories.length === 0) {
    return <EmptyMenu themeClasses={themeClasses} />
  }

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      {categories.map((category) => (
        <MenuCategory 
          key={category.id}
          category={category}
          getCategoryName={getCategoryName}
          getItemName={getItemName}
          getItemDescription={getItemDescription}
          themeClasses={themeClasses}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  )
} 