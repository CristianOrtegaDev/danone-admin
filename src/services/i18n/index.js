import config from 'constants/config'
import locales from './locales'

// Get active language file stored in localStorage.
const locale = localStorage.getItem('locale') || config.DEFAULT_LOCALE

// Get translation by key.
const translate = (key, ...args) => {
  // Check if key is for template translation.
  const isTemplateTranslation = args.length > 0

  // If is template translation pass arguments, if not just return the value of the translation key.
  const translation = isTemplateTranslation ? locales[locale][key](...args) : locales[locale][key]

  // Return translation.
  if (translation) {
    return translation
  }
}

export default translate
