import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import CustomItemDrawerContent from './CustomItemDrawerContent';
import { useAuth } from '@/context/AuthContext';

const CustomDrawerContent = (props: any) => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  return React.createElement(
    DrawerContentScrollView,
    props,
    // <CustomItemDrawerContent
    //   label={t('settingsPage.title.accountInformation')}
    //   icon={<ArrowLeft size={22} />}
    //   onPress={() => props.navigation.navigate('SettingsPage')}
    // />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.changePassword')}
      onPress={() => props.navigation.navigate('ChangePasswordPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.changeLanguage')}
      onPress={() => props.navigation.navigate('ChangeLanguagePage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.rulesOfUse')}
      onPress={() => props.navigation.navigate('TermsAndConditionsPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.supportFAQs')}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,

    // <CustomItemDrawerContent
    //   label={t('settingsPage.title.adminSettings')}
    //   onPress={() => props.navigation.navigate('SettingsPage')}
    // />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.logout')}
      onPress={() => {
        logout();
      }}
    />,
  );
};

export default CustomDrawerContent;
