import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import fa from './fa.json';
import zh from './zh.json';
import ru from './ru.json';

const resources = {
  en: {
    translation: en,
  },
  fa: {
    translation: fa,
  },
  zh: {
    translation: zh,
  },
  ru: {
    translation: ru,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fa',
  fallbackLng: 'fa',

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
