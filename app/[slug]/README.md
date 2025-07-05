# Menu Page Components (SSR + SEO Optimized)

This directory contains the refactored menu page components with **full SSR support** for optimal SEO performance.

## Structure

### Main Components
- **page.js** - Server component with `generateMetadata` for dynamic SEO
- **MenuPageClient.js** - Client component for interactive features

### UI Components (`/components`)
- **ErrorState.js** - Error message component with navigation
- **ThemeToggle.js** - Theme switcher button
- **LanguageSwitcher.js** - Language selection dropdown
- **MenuHeader.js** - Restaurant header with info and controls
- **MenuItem.js** - Individual menu item card
- **MenuCategory.js** - Category section with items
- **MenuContent.js** - Main menu content area
- **EmptyMenu.js** - Empty state message
- **MenuFooter.js** - Footer with branding

### Hooks (`/hooks`)
- **useTheme.js** - Client-side theme state management (dark/light mode)

### Utils (`/utils`)
- **structuredData.js** - SEO structured data generation

### SEO Files (App Root)
- **sitemap.js** - Dynamic sitemap including all restaurant pages
- **robots.js** - Search engine crawling rules

## Benefits

### 🚀 **True SSR & SEO**
- **Server-side rendering** - Pages load instantly for better UX and SEO
- **Dynamic metadata** - `generateMetadata` creates SEO tags based on actual data
- **Structured data** - Google rich snippets for restaurant pages
- **Dynamic sitemap** - All restaurant pages automatically included
- **Robots.txt** - Proper search engine crawling rules

### 🧩 **Clean Architecture**
- **Server/Client separation** - Data fetching on server, interactions on client
- **Small, focused components** - Easy to test and maintain
- **Consistent props interface** - Predictable component behavior
- **Separation of concerns** - Logic separated from presentation

### 🎨 **Modern UX**
- **Persistent theme preference** - Dark/light mode with localStorage
- **Smooth transitions** - CSS animations for better feel
- **Responsive design** - Works perfectly on all devices
- **Accessible design** - ARIA labels and semantic HTML

### 🌍 **Multi-language Ready**
- **Dynamic language switching** - Client-side language preference
- **Translation helpers** - Easy content localization
- **Fallback support** - Always shows content even without translations

## Architecture

### Server Component (`page.js`)
```javascript
// ✅ Runs on server - Great for SEO
export async function generateMetadata({ params }) {
  const restaurant = await fetchRestaurant(params.slug)
  return { title: `${restaurant.name} - Menu`, ... }
}

export default async function PublicMenuPage({ params }) {
  const { restaurant, categories } = await getMenuData(params.slug)
  return <MenuPageClient restaurant={restaurant} categories={categories} />
}
```

### Client Component (`MenuPageClient.js`)
```javascript
// ✅ Runs on client - Handles interactions
'use client'
export default function MenuPageClient({ restaurant, categories }) {
  const { isDarkMode, toggleTheme } = useTheme()
  const [selectedLanguage, setSelectedLanguage] = useState('bg')
  
  return (
    <div className={themeClasses.background}>
      <MenuHeader restaurant={restaurant} toggleTheme={toggleTheme} />
      <MenuContent categories={categories} />
    </div>
  )
}
```

## Performance Benefits

- **First Contentful Paint** - Faster loading with SSR
- **SEO Indexing** - Search engines see complete HTML
- **Core Web Vitals** - Better Google ranking scores
- **Zero Layout Shift** - No content jumping during load
- **Smaller Bundle** - Server components don't increase client JS

## Future Improvements

- Add React.memo for client component optimization
- Implement ISR (Incremental Static Regeneration) for popular restaurants
- Add component unit tests with Jest/RTL
- Create Storybook documentation
- Add accessibility audit and improvements
- Implement error boundaries for better error handling 