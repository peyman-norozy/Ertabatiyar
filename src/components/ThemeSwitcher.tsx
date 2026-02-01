import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CustomSwitch, Text } from '@/shared/ui';

const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useColorScheme();
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      setColorScheme('light');
    } else {
      setColorScheme('dark');
    }
  }, [darkMode]);

  return (
    <View>
      <View className="flex-row items-center justify-between gap-2">
        <CustomSwitch
          value={darkMode}
          onValueChange={setDarkMode}
          size="sm"
          activeColor="#6366f1"
        />
      </View>
    </View>
  );
};

export default ThemeSwitcher;
