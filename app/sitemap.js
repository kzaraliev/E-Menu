import { supabase } from '@/lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://e-menu.bg'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  try {
    // Fetch all active restaurants for dynamic pages
    const { data: restaurants, error } = await supabase
      .from('restaurants')
      .select('slug, updated_at')
      .eq('is_active', true)

    if (error) {
      console.error('Error fetching restaurants for sitemap:', error)
      return staticPages
    }

    // Create dynamic pages for each restaurant
    const restaurantPages = restaurants.map((restaurant) => ({
      url: `${baseUrl}/${restaurant.slug}`,
      lastModified: new Date(restaurant.updated_at),
      changeFrequency: 'daily',
      priority: 0.8,
    }))

    return [...staticPages, ...restaurantPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
} 