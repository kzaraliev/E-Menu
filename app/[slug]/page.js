import { supabase } from '@/lib/supabase'
import { AVAILABLE_LANGUAGES, getTranslation } from '@/lib/languages'
import { generateStructuredData } from './utils/structuredData'
import MenuPageClient from './components/MenuPageClient'
import ErrorState from './components/ErrorState'

// Server-side metadata generation for SEO
export async function generateMetadata({ params }) {
  const {slug} = await params;
  try {
    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !restaurant) {
      return {
        title: 'Ресторант не е намерен | e-menu.bg',
        description: 'Ресторантът, който търсите, не е намерен или временно не е наличен.',
        robots: {
          index: false,
          follow: false,
        },
      }
    }

    const title = `${restaurant.name} - Дигитално меню | e-menu.bg`
    const description = `Разгледайте менюто на ${restaurant.name}${restaurant.description ? ` - ${restaurant.description}` : ''}. Най-добрите предложения и актуални цени.`

    return {
      title,
      description,
      keywords: `${restaurant.name}, меню, ресторант, храна, ${restaurant.address || 'България'}`,
      robots: {
        index: restaurant.is_active,
        follow: restaurant.is_active,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `https://e-menu.bg/${slug}`,
        siteName: 'e-menu.bg',
        locale: 'bg_BG',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: `https://e-menu.bg/${slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Грешка при зареждане | e-menu.bg',
      description: 'Възникна грешка при зареждането на менюто.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }
}

// Server-side data fetching
async function getMenuData(slug) {
  try {
    // Fetch restaurant by slug
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('slug', slug)
      .single()

    if (restaurantError || !restaurant) {
      return { error: 'Ресторантът не е намерен' }
    }

    // Check if restaurant is active
    if (!restaurant.is_active) {
      return { error: 'Ресторантът временно не е наличен' }
    }

    // Fetch categories with menu items and translations
    const { data: categories, error: categoriesError } = await supabase
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
      .eq('restaurant_id', restaurant.id)
      .order('sort_order', { ascending: true })

    if (categoriesError) {
      return { error: 'Грешка при зареждането на менюто' }
    }

    // Filter out categories without items
    const categoriesWithItems = categories?.filter(category => 
      category.menu_items && category.menu_items.length > 0
    ) || []

    return {
      restaurant,
      categories: categoriesWithItems,
      error: null
    }
  } catch (err) {
    console.error('Error fetching menu data:', err)
    return { error: 'Грешка при зареждането на менюто' }
  }
}

export default async function PublicMenuPage({ params }) {
  const {slug} = await params;
  const { restaurant, categories, error } = await getMenuData(slug)

  if (error || !restaurant) {
    return <ErrorState error={error} isDarkMode={false} />
  }

  // Generate structured data for SEO
  const getCategoryName = (category) => getTranslation(category, category.category_translations, 'name', 'bg')
  const getItemName = (item) => getTranslation(item, item.menu_item_translations, 'name', 'bg')
  const getItemDescription = (item) => getTranslation(item, item.menu_item_translations, 'description', 'bg')
  
  const structuredData = generateStructuredData(restaurant, categories, getCategoryName, getItemName, getItemDescription)

  // Determine available languages
  const availableLanguages = new Set(['bg'])
  categories.forEach(category => {
    category.category_translations?.forEach(translation => {
      availableLanguages.add(translation.language_code)
    })
    category.menu_items?.forEach(item => {
      item.menu_item_translations?.forEach(translation => {
        availableLanguages.add(translation.language_code)
      })
    })
  })

  const availableLanguagesForRestaurant = AVAILABLE_LANGUAGES.filter(lang => 
    availableLanguages.has(lang.code)
  )

  return (
    <>
      {/* Structured Data for SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Client Component for Interactive Features */}
      <MenuPageClient 
        restaurant={restaurant}
        categories={categories}
        availableLanguagesForRestaurant={availableLanguagesForRestaurant}
        slug={slug}
      />
    </>
  )
} 