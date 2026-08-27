import { ref } from 'vue'

const lang = ref('km')

export function useLanguage() {
  const t = (km, en) => {
    return lang.value === 'km' ? km : en
  }

  const toggleLang = () => {
    lang.value = lang.value === 'km' ? 'en' : 'km'
    document.documentElement.lang = lang.value
  }

  return { lang, t, toggleLang }
}
