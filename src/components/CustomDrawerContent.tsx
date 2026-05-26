import React, { useState } from 'react';
import { View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';

import CustomItemDrawerContent from './CustomItemDrawerContent';
import LogoutModal from './LogoutModal';
import ThemeSwitcher from './ThemeSwitcher';

import { useAuth } from '@/context/AuthContext';
import { Lock, Translate, InfoCircle } from '@/shared/assets/icons';
import Logout from '@/shared/assets/icons/Logout';
import { useThemeMode } from '@/hook/useThemeMode';

const CustomDrawerContent = (props: any) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const { isDark } = useThemeMode();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingVertical: 16 }}
      style={{ backgroundColor: isDark ? '#171717' : '#fff' }}
    >
      <View className="px-4 mb-6 items-end">
        <ThemeSwitcher />
      </View>
      <View className="px-2 mb-2">
        <CustomItemDrawerContent
          label={t('settingsPage.title.changePassword')}
          icon={
            <Lock width={24} height={24} stroke={isDark ? '#fff' : '#000'} />
          }
          onPress={() => props.navigation.navigate('ChangePasswordPage')}
        />

        <CustomItemDrawerContent
          label={t('settingsPage.title.changeLanguage')}
          icon={
            <Translate
              width={24}
              height={24}
              stroke={isDark ? '#fff' : '#000'}
            />
          }
          onPress={() => props.navigation.navigate('ChangeLanguagePage')}
        />
      </View>
      <View className="px-2 mb-2">
        <CustomItemDrawerContent
          label={t('settingsPage.title.rulesOfUse')}
          icon={
            <InfoCircle
              width={24}
              height={24}
              stroke={isDark ? '#fff' : '#000'}
            />
          }
          onPress={() => props.navigation.navigate('TermsAndConditionsPage')}
        />
      </View>
      <View className="px-2">
        <CustomItemDrawerContent
          label={t('settingsPage.title.logout')}
          icon={
            <Logout width={24} height={24} stroke={isDark ? '#fff' : '#000'} />
          }
          onPress={() => setModalVisible(true)}
        />
      </View>
      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLogout={async () => {
          await logout();
          setModalVisible(false);
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
