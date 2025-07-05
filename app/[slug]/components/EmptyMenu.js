export default function EmptyMenu({ themeClasses }) {
  return (
    <div className="text-center py-8 sm:py-12 lg:py-16 px-3 sm:px-4">
      <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6">🍽️</div>
      <h2 className={`text-lg sm:text-xl font-semibold ${themeClasses.text} mb-2 break-words`}>Менюто се подготвя</h2>
      <p className={`${themeClasses.textSecondary} text-sm sm:text-base break-words`}>Скоро ще можете да видите нашите предложения тук.</p>
    </div>
  )
} 