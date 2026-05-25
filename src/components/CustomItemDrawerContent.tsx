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
  return (
    <Pressable onPress={onPress}>
      <View className="flex-row items-center justify-between py-4">
        <View className="flex-row items-center gap-2">
          <View className="ml-4">{icon}</View>
          <Text font="font-yekan-medium">{label}</Text>
        </View>
        <View className="scale-x-[-1]">
          <Arrow width={14} height={14} stroke={'#616161'} />
        </View>
      </View>
      <View className="h-px bg-[#E5E5E5] mx-5" />
    </Pressable>
  );
};

export default CustomItemDrawerContent;
