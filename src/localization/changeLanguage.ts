import i18n from './i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18nManager } from 'react-native';
import Restart from 'react-native-restart';

export const changeLanguage = async (lng: 'fa' | 'en') => {
  await i18n.changeLanguage(lng);

  await AsyncStorage.setItem('appLanguage', lng);

  const isRTL = lng === 'fa';
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    Restart.Restart();
  }
};
