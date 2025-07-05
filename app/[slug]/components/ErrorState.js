import Link from 'next/link'

export default function ErrorState({ error, isDarkMode }) {
  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
  }

  return (
    <div className={`min-h-screen ${themeClasses.background} flex justify-center items-center`}>
      <div className="text-center max-w-md mx-auto px-3 sm:px-4 lg:px-6">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🍽️</div>
        <h1 className={`text-xl sm:text-2xl font-bold ${themeClasses.text} mb-3 sm:mb-4 break-words`}>Ресторантът не е намерен</h1>
        <p className={`text-base sm:text-lg ${themeClasses.textSecondary} mb-6 sm:mb-8 break-words`}>{error || 'Моля, проверете адреса и опитайте отново.'}</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm sm:text-base"
        >
          Към e-menu.bg
        </Link>
      </div>
    </div>
  )
} 