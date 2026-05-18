import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  DeviceInformationPage,
  Language,
  OtpRegister,
  PersonalInformationPage,
  PhoneRegister,
} from '@/pages';
import { CustomHeader } from '@/shared/ui/header/ui';
import { useTranslation } from 'react-i18next';
import { checkLanguage } from '@/utils/checkLanguage.ts';
import SplashScreen from '@/components/SplashScreen.tsx';

const Stack = createNativeStackNavigator();

export const AuthNavigator = () => {
  const { t } = useTranslation();
  const [hasLang, setHasLang] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLanguage().then(Lang => {
      setHasLang(Lang);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={hasLang ? 'LoginStep1' : 'language'}
      screenOptions={{ headerShown: true }}
    >
      <Stack.Screen
        name="language"
        component={Language}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginStep1"
        component={PersonalInformationPage}
        options={{
          header: () => (
            <CustomHeader
              title={t('general.back')}
              showLogo={false}
              showThemeSwitcher
              showBackButton
              backUrl={'language'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="RegisterStep1"
        component={PhoneRegister}
        options={{
          header: () => (
            <CustomHeader
              title={t('general.back')}
              showThemeSwitcher
              showBackButton
              showLogo={false}
            />
          ),
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
              showLogo={false}
            />
          ),
        }}
      />

      <Stack.Screen
        name="OtpRegister"
        component={OtpRegister}
        options={{
          header: () => (
            <CustomHeader
              showBackButton
              title={t('deviceInformation.header.title' as any)}
              showThemeSwitcher
              showLogo={false}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};
