import { useColorScheme } from 'nativewind';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_KEY = '@app_theme';

type ThemeMode = 'light' | 'dark';

export const useThemeMode = () => {
  const { setColorScheme } = useColorScheme();

  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);
        const dark = saved === 'dark';

        setIsDark(dark);
        setColorScheme(dark ? 'dark' : 'light');
      } finally {
        setReady(true);
      }
    })();
  }, [setColorScheme]);

  const setTheme = useCallback(
    async (value: boolean) => {
      setIsDark(value);
      setColorScheme(value ? 'dark' : 'light');

      await AsyncStorage.setItem(
        THEME_KEY,
        value ? 'dark' : 'light'
      );
    },
    [setColorScheme]
  );

  const toggleTheme = useCallback(async () => {
    await setTheme(!isDark);
  }, [isDark, setTheme]);

  return {
    isDark,
    ready,
    setTheme,
    toggleTheme,
  };
};