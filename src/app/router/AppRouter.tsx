import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { linking } from '@/shared';
import HomePage from '@/pages/HomePage';
import ProfilePage from '@/pages/ProfilePage';
import { CustomHeader } from '@/shared/ui/header/ui';

const Drawer = createDrawerNavigator();

export const AppRouter = () => {
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Drawer.Navigator
          initialRouteName="HomePage"
          screenOptions={{
            header: () => null,
            drawerPosition: 'right',
            drawerType: 'slide',
            overlayColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <Drawer.Screen
            name="HomePage"
            component={HomePage}
            options={{
              title: 'خانه',
              header: () => <CustomHeader title="خانه" showMenuButton />,
            }}
          />
          <Drawer.Screen
            name="ProfilePage"
            component={ProfilePage}
            options={{
              title: 'پروفایل',
              header: () => <CustomHeader title="پروفایل" showMenuButton />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
