import { ZoneKeyType } from '@/types/zone';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface CustomHeaderPropsType {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  showThemeSwitcher?: boolean;
  showLogo?: boolean;
  backUrl?: string;
  isDark?: boolean;
}

export type RootDrawerParamList = {
  HomePage: undefined;
  NotificationPage: undefined;
  ProfilePage: undefined;
  ZoneSettingsPage: { zoneId: ZoneKeyType };
  OtpRegister: { userPhone: any; devicePhone: any };
  language: undefined;
};

export type RoutesWithoutParams = {
  [K in keyof RootDrawerParamList]: RootDrawerParamList[K] extends undefined
    ? K
    : never;
}[keyof RootDrawerParamList];

export type RoutesWithParams = {
  [K in keyof RootDrawerParamList]: RootDrawerParamList[K] extends undefined
    ? never
    : K;
}[keyof RootDrawerParamList];

export type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;
