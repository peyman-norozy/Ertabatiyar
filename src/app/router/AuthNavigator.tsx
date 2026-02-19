import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DeviceInformationPage, PersonalInformationPage } from '@/pages';
import { CustomHeader } from '@/shared/ui/header/ui';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="LoginStep1"
        component={PersonalInformationPage}
        options={{
          header: () => <CustomHeader showThemeSwitcher />,
        }}
      />
      <Stack.Screen
        name="LoginStep2"
        component={DeviceInformationPage}
        options={{
          header: () => (
            <CustomHeader
              showBackButton
              title={t('deviceInformation.header.title' as any)}
              showThemeSwitcher
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
