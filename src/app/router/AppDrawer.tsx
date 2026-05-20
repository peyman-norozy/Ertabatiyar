import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  HomePage,
  ProfilePage,
  NotificationPage,
  ZoneSettingsPage,
  ChangePasswordPage,
  ChangeLanguagePage,
  TermsAndConditionsPage,
} from '@/pages';
import { CustomHeader } from '@/shared/ui/header/ui';
import CustomDrawerContent from '@/components/CustomDrawerContent.tsx';
import { I18nManager } from 'react-native';
import { DrawerParamList } from '@/types/navigation.ts';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/context/AuthContext';
import { AppLoadingScreen } from '@/shared/ui';

const Drawer = createDrawerNavigator<DrawerParamList>();
export const AppDrawer = () => {
  const { t } = useTranslation();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <AppLoadingScreen />;
  }
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
          header: () => <CustomHeader title={t('menu.home')} showMenuButton />,
        }}
      />
      <Drawer.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          header: () => (
            <CustomHeader title={t('menu.profile')} showMenuButton />
          ),
        }}
      />
      <Drawer.Screen
        name="NotificationPage"
        component={NotificationPage}
        options={{
          header: () => (
            <CustomHeader title={t('menu.notifications')} showMenuButton />
          ),
        }}
      />
      <Drawer.Screen
        name="ZoneSettingsPage"
        component={ZoneSettingsPage}
        options={{
          header: () => (
            <CustomHeader title={t('general.back')} showBackButton />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangePasswordPage"
        component={ChangePasswordPage}
        options={{
          header: () => (
            <CustomHeader title={t('general.back')} showBackButton />
          ),
        }}
      />
      <Drawer.Screen
        name="ChangeLanguagePage"
        component={ChangeLanguagePage}
        options={{
          header: () => (
            <CustomHeader title={t('general.back')} showBackButton />
          ),
        }}
      />
      <Drawer.Screen
        name="TermsAndConditionsPage"
        component={TermsAndConditionsPage}
        options={{
          header: () => (
            <CustomHeader title={t('general.back')} showBackButton />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
