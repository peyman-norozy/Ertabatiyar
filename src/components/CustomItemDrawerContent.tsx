import { useThemeMode } from '@/hook/useThemeMode';
import { Arrow } from '@/shared/assets/icons';
import { Text } from '@/shared/ui';
import React from 'react';
import { View, Pressable, GestureResponderEvent } from 'react-native';

type Props = {
  label: string;
  icon?: React.ReactNode;
  onPress: (event: GestureResponderEvent) => void;
};

const CustomItemDrawerContent: React.FC<Props> = ({ label, icon, onPress }) => {
  const { isDark } = useThemeMode();

  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center justify-between py-4 px-2">
        <View className="flex-row items-center gap-2">
          <View className="ml-3">{icon}</View>
          <Text className="text-black dark:text-white font-medium">
            {label}
          </Text>
        </View>
        <View className="scale-x-[-1]">
          <Arrow width={14} height={14} fill={isDark ? '#fff' : '#000'} />
        </View>
      </View>
      <View className="h-px bg-neutral-200 dark:bg-neutral-700 mx-5" />
    </Pressable>
  );
};

export default CustomItemDrawerContent;
