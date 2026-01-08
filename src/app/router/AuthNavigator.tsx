import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DeviceInformationPage, PersonalInformationPage } from '@/pages';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginStep1" component={PersonalInformationPage} />
      <Stack.Screen name="LoginStep2" component={DeviceInformationPage} />
    </Stack.Navigator>
  );
};
