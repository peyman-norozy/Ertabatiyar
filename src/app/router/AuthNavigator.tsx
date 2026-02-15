import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DeviceInformationPage, PersonalInformationPage } from '@/pages';
import { CustomHeader } from '@/shared/ui/header/ui';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="LoginStep1"
        component={PersonalInformationPage}
        options={{
          header: () => <CustomHeader />,
        }}
      />
      <Stack.Screen name="LoginStep2" component={DeviceInformationPage} />
    </Stack.Navigator>
  );
};
