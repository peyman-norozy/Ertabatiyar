import { DrawerNavigationProp } from '@react-navigation/drawer';

export interface CustomHeaderPropsType {
  title?: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  showThemeSwitcher?: boolean;
  showLogo?: boolean;
}

// اگر نوع خاصی برای RootParamList دارید استفاده کنید
export type RootDrawerParamList = {
  HomePage: undefined;
  NotificationPage: undefined;
  ProfilePage: undefined;
  ZoneSettingsPage: undefined;
};

export type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;
