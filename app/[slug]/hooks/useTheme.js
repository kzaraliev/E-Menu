import { useState, useEffect } from 'react'

export default function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('menu-theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('menu-theme', newTheme ? 'dark' : 'light')
  }

  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    cardBackground: isDarkMode ? 'bg-gray-800' : 'bg-white',
    headerBackground: isDarkMode ? 'bg-gray-800' : 'bg-white',
    categoryHeaderBackground: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    textSecondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    textMuted: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    border: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    itemBackground: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    itemHover: isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100',
    priceColor: isDarkMode ? 'text-green-400' : 'text-green-600',
    linkColor: isDarkMode ? 'text-blue-400' : 'text-blue-600',
    linkHover: isDarkMode ? 'hover:text-blue-300' : 'hover:text-blue-800',
  }

  return { isDarkMode, toggleTheme, themeClasses }
} 