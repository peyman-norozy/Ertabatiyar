import i18n from './i18n'; // مسیر فایل تنظیمات i18next خودت
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import Restart from 'react-native-restart'; // برای تغییر جهت RTL/LTR

export const changeLanguage = async (lng: 'fa' | 'en') => {
  await i18n.changeLanguage(lng);

  // ذخیره زبان در AsyncStorage
  await AsyncStorage.setItem('appLanguage', lng);

  // تغییر جهت متن (RTL برای فارسی، LTR برای انگلیسی)
  const isRTL = lng === 'fa';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    Restart.Restart(); // اپ رو ری‌استارت می‌کنه تا تغییرات اعمال بشه
  }
};
