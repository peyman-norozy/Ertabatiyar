import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './i18n';

export const changeLanguage = async (lang: 'fa' | 'en' | 'zh' | 'ru') => {
  await AsyncStorage.setItem('appLanguage', lang);
  await i18n.changeLanguage(lang);
};
