export default function LanguageSwitcher({ 
  selectedLanguage, 
  setSelectedLanguage, 
  availableLanguagesForRestaurant, 
  themeClasses 
}) {
  return (
    <div className="flex items-center space-x-1 sm:space-x-2">
      <span className={`text-xs sm:text-sm ${themeClasses.textMuted} hidden sm:block`}>Език:</span>
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className={`text-xs sm:text-sm ${themeClasses.cardBackground} ${themeClasses.text} ${themeClasses.border} border rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-0 transition-colors duration-200`}
      >
        {availableLanguagesForRestaurant.map((lang) => (
          <option key={lang.code} value={lang.code} className={themeClasses.text}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
} 