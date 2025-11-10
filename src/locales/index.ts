import { createI18n } from 'vue-i18n'
import { USERINFO_KEY } from '@/config/app'
import messages from '@intlify/unplugin-vue-i18n/messages'

export const langs = [
  { locale: 'en' },
  { locale: 'cn' },
  { locale: 'hk' },
]

export function getI18nLocale() {
  const lang = localStorage.getItem(`${USERINFO_KEY}_LAN`) || 'cn'
  if (langs.map(x => x.locale).includes(lang))
    return lang
  return lang
}

export const i18n = createI18n({
  locale: getI18nLocale(),
  legacy: false,
  messages,
})

/** 当前语言 */
export const locale = computed({
  get() {
    return i18n.global.locale.value
  },
  set(language: string) {
    localStorage.setItem(`${USERINFO_KEY}_LAN`, language)
    i18n.global.locale.value = language
  },
})
