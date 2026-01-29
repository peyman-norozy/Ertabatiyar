import { DrawerNavigationProp } from "@react-navigation/drawer";

export interface CustomHeaderPropsType {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
}

// اگر نوع خاصی برای RootParamList دارید استفاده کنید
export type RootDrawerParamList = {
  Home: undefined;
  // بقیه صفحات...
};

export type NavigationProp = DrawerNavigationProp<RootDrawerParamList>;
