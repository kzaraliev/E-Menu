// Supported languages for the e-menu system
export const AVAILABLE_LANGUAGES = [
  { 
    code: 'bg', 
    name: 'Български', 
    flag: 'BG',
    flagIcon: '🇧🇬',
    direction: 'ltr',
    isDefault: true,
    description: 'Bulgarian (default)'
  },
  { 
    code: 'en', 
    name: 'English', 
    flag: 'EN',
    flagIcon: '🇬🇧',
    direction: 'ltr',
    isDefault: false,
    description: 'English'
  },
  { 
    code: 'de', 
    name: 'Deutsch', 
    flag: 'DE',
    flagIcon: '🇩🇪',
    direction: 'ltr',
    isDefault: false,
    description: 'German'
  },
  { 
    code: 'fr', 
    name: 'Français', 
    flag: 'FR',
    flagIcon: '🇫🇷',
    direction: 'ltr',
    isDefault: false,
    description: 'French'
  },
  { 
    code: 'ru', 
    name: 'Русский', 
    flag: 'RU',
    flagIcon: '🇷🇺',
    direction: 'ltr',
    isDefault: false,
    description: 'Russian'
  },
  { 
    code: 'es', 
    name: 'Español', 
    flag: 'ES',
    flagIcon: '🇪🇸',
    direction: 'ltr',
    isDefault: false,
    description: 'Spanish'
  },
  { 
    code: 'it', 
    name: 'Italiano', 
    flag: 'IT',
    flagIcon: '🇮🇹',
    direction: 'ltr',
    isDefault: false,
    description: 'Italian'
  },
  { 
    code: 'tr', 
    name: 'Türkçe', 
    flag: 'TR',
    flagIcon: '🇹🇷',
    direction: 'ltr',
    isDefault: false,
    description: 'Turkish'
  },
  { 
    code: 'ar', 
    name: 'العربية', 
    flag: 'AR',
    flagIcon: '🇸🇦',
    direction: 'rtl',
    isDefault: false,
    description: 'Arabic'
  },
  { 
    code: 'zh', 
    name: '中文', 
    flag: 'CN',
    flagIcon: '🇨🇳',
    direction: 'ltr',
    isDefault: false,
    description: 'Chinese'
  },
  { 
    code: 'ja', 
    name: '日本語', 
    flag: 'JP',
    flagIcon: '🇯🇵',
    direction: 'ltr',
    isDefault: false,
    description: 'Japanese'
  }
]

// Helper functions
export const getLanguageByCode = (code) => {
  return AVAILABLE_LANGUAGES.find(lang => lang.code === code)
}

export const getDefaultLanguage = () => {
  return AVAILABLE_LANGUAGES.find(lang => lang.isDefault)
}

export const getTranslation = (item, translations, field, languageCode = 'bg') => {
  const defaultLang = getDefaultLanguage()
  
  if (languageCode === defaultLang.code) {
    // If default language, return original field
    return item[field]
  }
  
  // Look for translation
  const translation = translations?.find(t => t.language_code === languageCode)
  return translation?.[field] || item[field] // Fallback to original
}

// Language specific text translations for UI
export const UI_TRANSLATIONS = {
  bg: {
    language: 'Език',
    loading: 'Зареждане...',
    error: 'Грешка',
    save: 'Запази',
    cancel: 'Отказ',
    edit: 'Редактирай',
    delete: 'Изтрий',
    add: 'Добави',
    translation: 'Превод',
    original: 'Оригинал',
    addTranslation: 'Добави превод',
    editTranslation: 'Редактирай превод',
    categoryName: 'Име на категорията',
    itemName: 'Име на артикула',
    description: 'Описание',
    optional: '(незадължително)',
    menuPreparing: 'Менюто се подготвя',
    menuPreparingSub: 'Скоро ще можете да видите нашите предложения тук.',
    restaurantNotFound: 'Ресторантът не е намерен',
    checkAddress: 'Моля, проверете адреса и опитайте отново.',
    poweredBy: 'Powered by'
  },
  en: {
    language: 'Language',
    loading: 'Loading...',
    error: 'Error',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    translation: 'Translation',
    original: 'Original',
    addTranslation: 'Add translation',
    editTranslation: 'Edit translation',
    categoryName: 'Category name',
    itemName: 'Item name',
    description: 'Description',
    optional: '(optional)',
    menuPreparing: 'Menu in preparation',
    menuPreparingSub: 'You will soon be able to see our offerings here.',
    restaurantNotFound: 'Restaurant not found',
    checkAddress: 'Please check the address and try again.',
    poweredBy: 'Powered by'
  },
  de: {
    language: 'Sprache',
    loading: 'Laden...',
    error: 'Fehler',
    save: 'Speichern',
    cancel: 'Abbrechen',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    add: 'Hinzufügen',
    translation: 'Übersetzung',
    original: 'Original',
    addTranslation: 'Übersetzung hinzufügen',
    editTranslation: 'Übersetzung bearbeiten',
    categoryName: 'Kategoriename',
    itemName: 'Artikelname',
    description: 'Beschreibung',
    optional: '(optional)',
    menuPreparing: 'Menü wird vorbereitet',
    menuPreparingSub: 'Bald können Sie hier unsere Angebote sehen.',
    restaurantNotFound: 'Restaurant nicht gefunden',
    checkAddress: 'Bitte überprüfen Sie die Adresse und versuchen Sie es erneut.',
    poweredBy: 'Powered by'
  },
  fr: {
    language: 'Langue',
    loading: 'Chargement...',
    error: 'Erreur',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    delete: 'Supprimer',
    add: 'Ajouter',
    translation: 'Traduction',
    original: 'Original',
    addTranslation: 'Ajouter une traduction',
    editTranslation: 'Modifier la traduction',
    categoryName: 'Nom de la catégorie',
    itemName: 'Nom de l\'article',
    description: 'Description',
    optional: '(optionnel)',
    menuPreparing: 'Menu en préparation',
    menuPreparingSub: 'Vous pourrez bientôt voir nos offres ici.',
    restaurantNotFound: 'Restaurant non trouvé',
    checkAddress: 'Veuillez vérifier l\'adresse et réessayer.',
    poweredBy: 'Powered by'
  },
  ru: {
    language: 'Язык',
    loading: 'Загрузка...',
    error: 'Ошибка',
    save: 'Сохранить',
    cancel: 'Отмена',
    edit: 'Редактировать',
    delete: 'Удалить',
    add: 'Добавить',
    translation: 'Перевод',
    original: 'Оригинал',
    addTranslation: 'Добавить перевод',
    editTranslation: 'Редактировать перевод',
    categoryName: 'Название категории',
    itemName: 'Название блюда',
    description: 'Описание',
    optional: '(необязательно)',
    menuPreparing: 'Меню готовится',
    menuPreparingSub: 'Скоро здесь можно будет увидеть наши предложения.',
    restaurantNotFound: 'Ресторан не найден',
    checkAddress: 'Пожалуйста, проверьте адрес и попробуйте снова.',
    poweredBy: 'Powered by'
  }
}

export const getUIText = (key, languageCode = 'bg') => {
  const langTexts = UI_TRANSLATIONS[languageCode] || UI_TRANSLATIONS.bg
  return langTexts[key] || UI_TRANSLATIONS.bg[key] || key
} 