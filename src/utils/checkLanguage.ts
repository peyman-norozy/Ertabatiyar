import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLanguage = async () => {
  const language = await AsyncStorage.getItem('appLanguage');
  // console.log(language, 'dsjfueueugggg');

  if (language) {
    return true;
  } else {
    return false;
  }
};
