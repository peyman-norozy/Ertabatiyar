// src/localization/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';

// import فایل‌های JSON
import en from './en.json';
import fa from './fa.json';

const resources = {
  en: { translation: en },
  fa: { translation: fa },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem('appLanguage');

  if (!savedLanguage) {
    // fallback به زبان دستگاه یا 'en'
    savedLanguage = 'en'; // یا منطق تشخیص زبان دستگاه
  }

  const isRTL = savedLanguage === 'fa';
  I18nManager.allowRTL(isRTL);
  I18nManager.forceRTL(isRTL);

  i18n.use(initReactI18next).init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // برای React لازم نیست escape کنیم
    },
    // اگر بعداً namespaces خواستی اضافه کن
    // ns: ['common', 'home'], defaultNS: 'common'
  });
};

initI18n();

export default i18n;
