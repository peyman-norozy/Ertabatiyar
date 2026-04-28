import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

const CustomDrawerContent = (props: any) => {
  return React.createElement(
    DrawerContentScrollView,
    props,
    <DrawerItem
      label="تنظیمات"
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,
    <DrawerItem
      label="تdsadasت"
      onPress={() => props.navigation.navigate('SettingsPage')}
    />,
  );
};

export default CustomDrawerContent;
