// AppRouter.tsx
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { linking } from '@/shared';
import { AuthNavigator } from '@/app/router/AuthNavigator.tsx';
import { AppDrawer } from '@/app/router/AppDrawer.tsx';

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  const [isLoggedIn] = useState(false);

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
    }
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isLoggedIn ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="App" component={AppDrawer} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};
