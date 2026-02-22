import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  HomePage,
  ProfilePage,
  NotificationPage,
  ZoneSettingsPage,
} from '@/pages';
import { CustomHeader } from '@/shared/ui/header/ui';
import CustomDrawerContent from '@/components/CustomDrawerContent.tsx';
import { I18nManager } from 'react-native';
import { DrawerParamList } from '@/types/navigation.ts';

const Drawer = createDrawerNavigator<DrawerParamList>();
export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerPosition: I18nManager.isRTL ? 'left' : 'right',
        drawerType: 'slide',
        overlayColor: 'rgba(0,0,0,0.5)',
        headerTransparent: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{
          header: () => <CustomHeader title="خانه" showMenuButton />,
        }}
      />
      <Drawer.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          header: () => <CustomHeader title="پروفایل" showMenuButton />,
        }}
      />
      <Drawer.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          header: () => <CustomHeader title="اعلان ها" showMenuButton />,
        }}
      />
      <Drawer.Screen
        name="ZoneSettingsPage"
        component={ZoneSettingsPage}
        options={{
          header: () => <CustomHeader title="بازگشت" showBackButton />,
        }}
      />
    </Drawer.Navigator>
  );
};
