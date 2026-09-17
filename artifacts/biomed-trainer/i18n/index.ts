import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '@/i18n/locales/en.json';
import kk from '@/i18n/locales/kk.json';
import ru from '@/i18n/locales/ru.json';

export const supportedLanguages = ['ru', 'kk', 'en'] as const;
export type AppLanguage = (typeof supportedLanguages)[number];

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    kk: { translation: kk },
    en: { translation: en },
  },
  lng: 'ru',
  fallbackLng: 'ru',
  supportedLngs: supportedLanguages,
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export default i18n;