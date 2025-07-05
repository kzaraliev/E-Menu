import MenuItem from './MenuItem'

export default function MenuCategory({ 
  category, 
  getCategoryName, 
  getItemName, 
  getItemDescription, 
  themeClasses,
  onItemClick 
}) {
  return (
    <section className={`${themeClasses.cardBackground} rounded-lg shadow-sm overflow-hidden ${themeClasses.border} border`}>
      {/* Category Header */}
      <div className={`${themeClasses.categoryHeaderBackground} px-3 sm:px-4 lg:px-6 py-3 sm:py-4 ${themeClasses.border} border-b`}>
        <h2 className={`text-lg sm:text-xl font-semibold ${themeClasses.text} break-words`}>
          {getCategoryName(category)}
        </h2>
      </div>

      {/* Menu Items */}
      <div className="p-3 sm:p-4 lg:p-6">
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {category.menu_items
            ?.filter(item => item.menu_item_variants && item.menu_item_variants.length > 0)
            ?.map((item) => (
              <MenuItem 
                key={item.id}
                item={item}
                getItemName={getItemName}
                getItemDescription={getItemDescription}
                themeClasses={themeClasses}
                onClick={onItemClick}
              />
            ))}
        </div>
      </div>
    </section>
  )
} 