export default function MenuItem({ 
  item, 
  getItemName, 
  getItemDescription, 
  themeClasses,
  onClick 
}) {
  return (
    <article 
      onClick={() => onClick(item)}
      className={`${themeClasses.itemBackground} ${themeClasses.itemHover} rounded-lg p-3 transition-colors duration-200 cursor-pointer hover:scale-105 transform transition-transform`}
    >
      {/* Image */}
      {item.image_url && (
        <div className="mb-3">
          <img 
            src={item.image_url} 
            alt={`Снимка на ${getItemName(item)}`}
            className="w-full h-32 object-cover rounded-md"
            loading="lazy"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className={`text-base font-medium ${themeClasses.text} leading-tight`}>
          {getItemName(item)}
        </h3>
        
        {getItemDescription(item) && (
          <p className={`${themeClasses.textSecondary} text-xs leading-relaxed line-clamp-2`}>
            {getItemDescription(item)}
          </p>
        )}
        
        {/* Prices */}
        <div className="pt-1">
          {item.menu_item_variants?.map((variant) => (
            <div key={variant.id} className="flex items-center justify-between">
              {item.menu_item_variants.length > 1 && (
                <span className={`text-xs ${themeClasses.textMuted}`}>
                  {variant.name}
                </span>
              )}
              <span className={`text-lg font-semibold ${themeClasses.priceColor} ${item.menu_item_variants.length === 1 ? 'ml-auto' : ''}`}>
                {variant.price} лв.
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
} 