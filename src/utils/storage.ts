import AsyncStorage from '@react-native-async-storage/async-storage';

// گرفتن مقدار
export const getStorage = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`Get storage error (${key}):`, error);
    return null;
  }
};

// ذخیره مقدار
export const setStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(`Set storage error (${key}):`, error);
  }
};

// حذف یک مقدار
export const removeStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(`Remove storage error (${key}):`, error);
  }
};

// پاک کردن کل storage
export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log('Clear storage error:', error);
  }
};