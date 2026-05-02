import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from '@/shared/assets/icons';
import CustomItemDrawerContent from './CustomItemDrawerContent';

const CustomDrawerContent = (props: any) => {
  const { t } = useTranslation();
  return React.createElement(
    DrawerContentScrollView,
    props,
    <CustomItemDrawerContent
      label={t('settingsPage.title.accountInformation')}
      icon={<ArrowLeft size={22} />}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.rulesOfUse')}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.changePassword')}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.supportFAQs')}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.adminSettings')}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,

    <CustomItemDrawerContent
      label={t('settingsPage.title.logout')}
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,
  );
};

export default CustomDrawerContent;
