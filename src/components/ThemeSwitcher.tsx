import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomSwitch, Text } from '@/shared/ui';

const THEME_KEY = '@app_theme'; // یا هر نامی که دوست داری

const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [isDark, setIsDark] = useState<boolean | null>(null); // null = هنوز لود نشده

  // لود تم ذخیره‌شده موقع mount
  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        const isDarkStored = saved === 'dark';
        setIsDark(isDarkStored);
        setColorScheme(isDarkStored ? 'dark' : 'light');
      } catch (e) {
        // اگر خطا داد، پیش‌فرض مثلاً dark
        setIsDark(true);
        setColorScheme('dark');
      }
    })();
  }, []);

  // وقتی کاربر سوییچ کرد → ذخیره کن + اعمال کن
  const handleToggle = (value: boolean) => {
    setIsDark(value);
    const newScheme = value ? 'dark' : 'light';
    setColorScheme(newScheme);
    AsyncStorage.setItem(THEME_KEY, newScheme).catch(() => {});
  };

  // تا وقتی لود نشده، چیزی نشون نده یا لودینگ بگذار
  if (isDark === null) {
    return null; // یا <ActivityIndicator />
  }

  return (
    <View>
      <View className="flex-row items-center justify-between gap-2">
        <CustomSwitch
          value={isDark}
          onValueChange={handleToggle}
          size="sm"
          activeColor="#6366f1"
        />
        {/* می‌تونی <Text>Dark Mode</Text> هم بذاری */}
      </View>
    </View>
  );
};

export default ThemeSwitcher;