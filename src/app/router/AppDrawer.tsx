import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  HomePage,
  ProfilePage,
  NotificationPage,
  ZoneSettingsPage,
} from '@/pages';
import { CustomHeader } from '@/shared/ui/header/ui';

const Drawer = createDrawerNavigator();

export const AppDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      screenOptions={{
        drawerPosition: 'right',
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
          header: () => <CustomHeader title="پروفایل" showMenuButton />,
        }}
      />
      <Drawer.Screen
        name="ZoneSettingsPage"
        component={ZoneSettingsPage}
        options={{
          header: () => <CustomHeader title="تنظیمات" showMenuButton />,
        }}
      />
    </Drawer.Navigator>
  );
};
