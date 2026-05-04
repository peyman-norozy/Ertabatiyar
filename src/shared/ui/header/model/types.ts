import { ZoneKeyType } from '@/types/zone';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface CustomHeaderPropsType {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  showThemeSwitcher?: boolean;
  showLogo?: boolean;
  backUrl?: string;
}

export type RootDrawerParamList = {
  HomePage: undefined;
  NotificationPage: undefined;
  ProfilePage: undefined;
  ZoneSettingsPage: { zoneId: ZoneKeyType };
  language: undefined;
};

export type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;
