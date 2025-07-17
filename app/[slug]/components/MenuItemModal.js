'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export default function MenuItemModal({ 
  item, 
  isOpen, 
  onClose, 
  getItemName, 
  getItemDescription, 
  themeClasses 
}) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden' // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !item) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative ${themeClasses.cardBackground} rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 p-2 rounded-full ${themeClasses.itemBackground} ${themeClasses.itemHover} transition-colors duration-200`}
          aria-label="Затвори"
        >
          <svg className={`w-5 h-5 ${themeClasses.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        {item.image_url && (
          <div className="relative">
            <Image 
              src={item.image_url} 
              alt={`Снимка на ${getItemName(item)}`}
              width={600}
              height={256}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        )}
        
        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h2 className={`text-2xl font-bold ${themeClasses.text} leading-tight`}>
            {getItemName(item)}
          </h2>
          
          {/* Description */}
          {getItemDescription(item) && (
            <p className={`${themeClasses.textSecondary} leading-relaxed text-base`}>
              {getItemDescription(item)}
            </p>
          )}
          
          {/* Prices */}
          <div className="space-y-3 pt-4">
            <h3 className={`text-lg font-semibold ${themeClasses.text} border-b ${themeClasses.border} pb-2`}>
              Цени
            </h3>
            
            <div className="space-y-2">
              {item.menu_item_variants?.map((variant) => (
                <div 
                  key={variant.id} 
                  className={`flex items-center justify-between p-3 ${themeClasses.itemBackground} rounded-lg`}
                >
                  <div className="flex-1">
                    {item.menu_item_variants.length > 1 && (
                      <span className={`text-sm font-medium ${themeClasses.text} block`}>
                        {variant.name}
                      </span>
                    )}
                    {variant.is_default && item.menu_item_variants.length > 1 && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block mt-1">
                        Стандартен
                      </span>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <span className={`text-2xl font-bold ${themeClasses.priceColor}`}>
                      {variant.price}
                    </span>
                    <span className={`text-sm ${themeClasses.textMuted} ml-1`}>
                      лв.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 