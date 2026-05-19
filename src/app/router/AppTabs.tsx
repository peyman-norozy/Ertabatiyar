import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePage, NotificationPage, ProfilePage } from '@/pages';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import { TabParamList } from '@/types/navigation.ts';

const Tab = createBottomTabNavigator<TabParamList>();

export const AppTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTab {...props} />}
      screenOptions={{ headerShown: false }}
    >
      {/* <Tab.Screen name="HomePage" component={HomePage} /> */}
      <Tab.Screen name="ProfilePage" component={ProfilePage} />
      <Tab.Screen name="NotificationPage" component={NotificationPage} />
    </Tab.Navigator>
  );
};
