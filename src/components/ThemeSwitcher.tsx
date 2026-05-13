import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomSwitch } from '@/shared/ui';

const THEME_KEY = '@app_theme'; 

const ThemeSwitcher = () => {
  const { setColorScheme } = useColorScheme();
  const [isDark, setIsDark] = useState<boolean | null>(false); 


  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        const isDarkStored = saved === 'dark';
        setIsDark(isDarkStored);
        setColorScheme(isDarkStored ? 'dark' : 'light');
      } catch (e) {
        setIsDark(true);
        setColorScheme('dark');
      }
    })();
  }, []);

  const handleToggle = (value: boolean) => {
    setIsDark(!value);
    const newScheme = value ? 'dark' : 'light';
    setColorScheme(newScheme);
    AsyncStorage.setItem(THEME_KEY, newScheme).catch(() => {});
  };

  if (isDark === null) {
    return null; // یا <ActivityIndicator />
  }

  return (
    <View>
      <View className="flex-row items-center justify-between gap-2">
        <CustomSwitch
          value={isDark}
          switchHandler={handleToggle}
          size="sm"
          activeColor="#6366f1"
        />
        {/* می‌تونی <Text>Dark Mode</Text> هم بذاری */}
      </View>
    </View>
  );
};

export default ThemeSwitcher;
