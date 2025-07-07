import ThemeToggle from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import Link from 'next/link'

export default function MenuHeader({ 
  restaurant, 
  isDarkMode, 
  toggleTheme, 
  selectedLanguage, 
  setSelectedLanguage, 
  availableLanguagesForRestaurant, 
  showLanguageSwitcher, 
  themeClasses 
}) {
  return (
    <header className={`${themeClasses.headerBackground} ${themeClasses.border} border-b sticky top-0 z-50 shadow-sm`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${themeClasses.text} break-words`}>
              {restaurant.name}
            </h1>
            {restaurant.description && (
              <p className={`mt-1 sm:mt-2 ${themeClasses.textSecondary} text-sm sm:text-base break-words`}>
                {restaurant.description}
              </p>
            )}
            <div className="mt-2 sm:mt-4 flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
              {restaurant.address && (
                <span className={`${themeClasses.textMuted} flex items-center`}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {restaurant.address}
                </span>
              )}
              {restaurant.phone && (
                <span className={`${themeClasses.textMuted} flex items-center`}>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {restaurant.phone}
                </span>
              )}
              {restaurant.website && (
                <Link
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${themeClasses.linkColor} ${themeClasses.linkHover} flex items-center transition-colors duration-200`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Уебсайт
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <ThemeToggle 
              isDarkMode={isDarkMode} 
              toggleTheme={toggleTheme} 
              themeClasses={themeClasses} 
            />

            {showLanguageSwitcher && (
              <LanguageSwitcher 
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                availableLanguagesForRestaurant={availableLanguagesForRestaurant}
                themeClasses={themeClasses}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
} 