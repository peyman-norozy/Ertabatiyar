import React, { useState } from 'react';
import { View, TouchableOpacity, I18nManager, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arrow, MenuIcon } from '@/shared/assets/icons';
import {
  CustomHeaderPropsType,
  NavigationProp,
} from '@/shared/ui/header/model';
import { CustomSwitch, Text } from '@/shared/ui';
import SettingsScreen from '@/components/SettingsScreen.tsx';
import ThemeSwitcher from '@/components/ThemeSwitcher.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoHeader } from '@/shared/assets/images';

const CustomHeader: React.FC<CustomHeaderPropsType> = ({
  title,
  showBackButton = false,
  showMenuButton = false,
  showThemeSwitcher = false,
  showLogo = true,
  backUrl,
}) => {
  const navigation = useNavigation<NavigationProp>();
  const isRTL = I18nManager.isRTL;

  return (
    <View className={` bg-white dark:bg-neutral-800 h-12`}>
      <View
        className={`flex-row-reverse items-center justify-between w-full bg-white dark:bg-neutral-800 p-4 shadow-md dark:shadow-neutral-600 rounded-b-2xl`}
      >
        {showMenuButton ? (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            className="mx-2"
          >
            <MenuIcon width={24} height={24} fill={'#292D32'} />
          </TouchableOpacity>
        ) : null}
        {showLogo ? (
          <View>
            <Image source={logoHeader} className="w-[92px] h-[29px]" />
          </View>
        ) : null}
        {showThemeSwitcher ? <ThemeSwitcher /> : null}
        {showBackButton ? (
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem('appLanguage');
              backUrl ? navigation.navigate(backUrl as any) : navigation.goBack();
            }}
            className="flex-row-reverse"
          >
            <View className={`${isRTL ? '' : 'rotate-180'}`}>
              <Arrow width={24} height={24} fill="#000" />
            </View>
          </TouchableOpacity>
        ) : null}

        {/*<SettingsScreen />*/}
      </View>
    </View>
  );
};

export default CustomHeader;
