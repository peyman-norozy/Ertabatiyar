// AppRouter.tsx
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { linking } from '@/shared';
import { AuthNavigator } from '@/app/router/AuthNavigator.tsx';
import { AppDrawer } from '@/app/router/AppDrawer.tsx';

const Stack = createNativeStackNavigator();

export const AppRouter = () => {
  const [isLoggedIn] = useState(false);

  return (
    <GestureHandlerRootView className={'flex-1'}>
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
