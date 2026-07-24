import { writable, derived } from 'svelte/store'
import ru from './locales/ru.json'
import uk from './locales/uk.json'
import en from './locales/en.json'

const translations = { ru, uk, en }

export const locale = writable(
  localStorage.getItem('lang') || 'ru'
)

locale.subscribe((val) => {
  localStorage.setItem('lang', val)
})

export const t = derived(locale, ($locale) => {
  const keys = translations[$locale] || translations['en']

  return (path) => {
    const parts = path.split('.')
    let result = keys
    for (const part of parts) {
      if (result && typeof result === 'object' && part in result) {
        result = result[part]
      } else {
        return path
      }
    }
    return typeof result === 'string' ? result : path
  }
})