import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import Restart from 'react-native-restart';

export const changeLanguage = async (lng: 'fa' | 'en' | 'zh' | 'ru') => {
  const isRTL = lng === 'fa';
  await AsyncStorage.setItem('appLanguage', lng);

  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);

    Restart.Restart();

    return;
  }

  await i18n.changeLanguage(lng);
};
