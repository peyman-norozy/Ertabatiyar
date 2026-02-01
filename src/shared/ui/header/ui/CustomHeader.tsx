// ui/CustomHeader.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuIcon } from '@/shared/assets/icons';
import {
  CustomHeaderPropsType,
  NavigationProp,
} from '@/shared/ui/header/model';
import { CustomSwitch, Text } from '@/shared/ui';
import SettingsScreen from '@/components/SettingsScreen.tsx';
import ThemeSwitcher from '@/components/ThemeSwitcher.tsx';

const CustomHeader: React.FC<CustomHeaderPropsType> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
}) => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-row-reverse items-center bg-white p-4 shadow-md">
      {showMenuButton && (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className="mx-2"
        >
          <MenuIcon width={30} height={30} fill={'#aaaaaa'} />
        </TouchableOpacity>
      )}
      {showBackButton && (
        <TouchableOpacity onPress={() => navigation.goBack()} className="mx-2">
          {/*<Icon name="arrow-back" size={24} color="#000" />*/}
        </TouchableOpacity>
      )}
      <Text className="flex-1 text-center" font={'font-yekan-semibold'}>
        {title}
      </Text>
      <ThemeSwitcher />
      {/*<SettingsScreen />*/}
    </View>
  );
};

export default CustomHeader;
