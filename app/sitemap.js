import { supabase } from '@/lib/supabase'
import { generateBlogSitemap } from '@/lib/blog'

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
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
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

    // Get blog pages
    const blogPages = generateBlogSitemap().map(post => ({
      url: post.url.replace(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com', baseUrl),
      lastModified: post.lastModified,
      changeFrequency: post.changeFrequency,
      priority: post.priority,
    }))

    return [...staticPages, ...restaurantPages, ...blogPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Include blog pages even if restaurant fetch fails
    const blogPages = generateBlogSitemap().map(post => ({
      url: post.url.replace(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com', baseUrl),
      lastModified: post.lastModified,
      changeFrequency: post.changeFrequency,
      priority: post.priority,
    }))
    return [...staticPages, ...blogPages]
  }
} 