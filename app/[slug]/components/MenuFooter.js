import Link from 'next/link'

export default function MenuFooter({ themeClasses }) {
  return (
    <footer className={`${themeClasses.headerBackground} ${themeClasses.border} border-t mt-6 sm:mt-8 lg:mt-12`}>
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 text-center">
        <p className={`text-xs sm:text-sm ${themeClasses.textMuted}`}>
          Powered by{' '}
          <Link 
            href="/" 
            className={`${themeClasses.linkColor} ${themeClasses.linkHover} font-medium transition-colors duration-200`}
          >
            e-menu.bg
          </Link>
        </p>
      </div>
    </footer>
  )
} 