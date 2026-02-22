// ui/CustomHeader.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arrow, MenuIcon } from '@/shared/assets/icons';
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
  showThemeSwitcher = false,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const isRTL = I18nManager.isRTL;

  return (
    <View className="flex-row-reverse items-center justify-between bg-white p-4 shadow-md rounded-b-2xl h-12">
      {showMenuButton && (
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          className="mx-2"
        >
          <MenuIcon width={24} height={24} fill={'#292D32'} />
        </TouchableOpacity>
      )}
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex-row-reverse"
        >
          <View className={`${isRTL ? 'rotate-180' : ''}`}>
            <Arrow width={24} height={24} fill="#000" />
          </View>
          <Text
            font={`font-yekan-semibold text-lg ${
              isRTL ? 'mt-[-3px]' : 'mt-1'
            } `}
          >
            {title}
          </Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      {showThemeSwitcher && <ThemeSwitcher />}
      {/*<SettingsScreen />*/}
    </View>
  );
};

export default CustomHeader;
