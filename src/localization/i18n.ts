import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fa from './fa.json';

const resources = {
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
};

i18n.use(initReactI18next).init({
  resources,

  lng: 'fa',

  fallbackLng: 'fa',

  interpolation: {
    escapeValue: false,
  },

  compatibilityJSON: 'v4',
});

export default i18n;
