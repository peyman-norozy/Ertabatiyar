import { useColorScheme } from 'nativewind';
import { Appearance } from 'react-native';
import { View, Pressable } from 'react-native';
import React from 'react';
import { Text } from '@/shared/ui';

const ThemeSwitcher = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <View>
      <Pressable onPress={() => setColorScheme('light')}>
        <Text>روشن (Light)</Text>
      </Pressable>

      <Pressable onPress={() => setColorScheme('dark')}>
        <Text>تاریک (Dark)</Text>
      </Pressable>

      <Text>حالت فعلی: {colorScheme}</Text>
    </View>
  );
};

export default ThemeSwitcher;
