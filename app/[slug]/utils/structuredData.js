export function generateStructuredData(restaurant, categories, getCategoryName, getItemName, getItemDescription) {
  if (!restaurant || !categories.length) return null

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.name,
    "description": restaurant.description,
    "address": restaurant.address,
    "telephone": restaurant.phone,
    "url": restaurant.website,
    "hasMenu": {
      "@type": "Menu",
      "hasMenuSection": categories.map(category => ({
        "@type": "MenuSection",
        "name": getCategoryName(category),
        "hasMenuItem": category.menu_items?.map(item => ({
          "@type": "MenuItem",
          "name": getItemName(item),
          "description": getItemDescription(item),
          "offers": item.menu_item_variants?.map(variant => ({
            "@type": "Offer",
            "price": variant.price,
            "priceCurrency": "BGN"
          }))
        })) || []
      }))
    }
  }
} 