import React from 'react';
import { View, TouchableOpacity, I18nManager, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Arrow, MenuIcon } from '@/shared/assets/icons';
import {
  CustomHeaderPropsType,
  NavigationProp,
} from '@/shared/ui/header/model';
import ThemeSwitcher from '@/components/ThemeSwitcher.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoHeader } from '@/shared/assets/images';
import { useThemeMode } from '@/hook/useThemeMode';

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
  const { isDark } = useThemeMode();

  return (
    <View className="bg-white dark:bg-neutral-900 h-12">
      <View
        className="
          flex-row-reverse items-center justify-between w-full
          bg-white dark:bg-neutral-900
          p-4
          shadow-md dark:shadow-black/40
          rounded-b-2xl
          border-b border-neutral-200 dark:border-neutral-700
        "
      >
        {/* Menu */}
        {showMenuButton ? (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            className="mx-2"
          >
            <MenuIcon width={24} height={24} fill={isDark ? '#fff' : '#000'} />
          </TouchableOpacity>
        ) : null}

        {/* Logo */}
        {showLogo ? (
          <View>
            <Image
              source={logoHeader}
              className="w-[100px] h-[29px]"
              style={{
                opacity: 1,
              }}
            />
          </View>
        ) : null}

        {/* Theme Switcher */}
        {showThemeSwitcher ? <ThemeSwitcher /> : null}

        {/* Back */}
        {showBackButton ? (
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem('appLanguage');
              backUrl
                ? navigation.navigate(backUrl as any)
                : navigation.goBack();
            }}
            className="flex-row-reverse"
          >
            <View className={`${isRTL ? '' : 'rotate-180'}`}>
              <Arrow width={24} height={24} fill={isDark ? '#fff' : '#000'} />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default CustomHeader;
