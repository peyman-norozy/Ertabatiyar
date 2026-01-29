// app.drawer.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { HomePage, ProfilePage } from '@/pages';
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
    </Drawer.Navigator>
  );
};
