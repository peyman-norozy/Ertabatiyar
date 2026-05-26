import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLanguage = async () => {
  const language = await AsyncStorage.getItem('appLanguage');

  if (language) {
    return true;
  } else {
    return false;
  }
};
