import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home, Notification, Profile } from '@/shared/assets/icons';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { SvgProps } from 'react-native-svg';

type TabType = {
  id: keyof RootStackParamList;
  icon: React.FC<SvgProps>;
  label: string;
};

type RootStackParamList = {
  HomePage: undefined;
  NotificationPage: undefined;
  ProfilePage: undefined;
};

const CustomBottomTab: React.FC = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const scaleValue = new Animated.Value(1);

  const tabs: TabType[] = [
    {
      id: 'NotificationPage',
      icon: Notification,
      label: t('customBottom.tabs.notificationTitle' as any),
    },
    {
      id: 'HomePage',
      icon: Home,
      label: t('customBottom.tabs.homeTitle' as any),
    },
    {
      id: 'ProfilePage',
      icon: Profile,
      label: t('customBottom.tabs.profileTitle' as any),
    },
  ];

  const handlePress = (tabId: keyof RootStackParamList) => {
    if (route.name !== tabId) {
      navigation.navigate(tabId as keyof RootStackParamList);
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 0.8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  return (
    <View className="flex-row h-[70px] bg-white border-t border-t-gray-200 px-5 justify-around">
      {tabs.map(tab => {
        const isActive = route.name === tab.id;
        const Icon = tab.icon;

        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handlePress(tab.id)}
            className="items-center justify-center pt-2 flex-1"
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                transform: [{ scale: isActive ? scaleValue : 1 }],
                opacity: isActive ? 1 : 0.6,
              }}
              className="items-center"
            >
              <Icon
                width={24}
                height={24}
                stroke={isActive ? '#3260C3' : '#616161'}
                fill="none"
              />
            </Animated.View>
            <Text
              className={`text-sm mt-1 ${
                isActive
                  ? 'text-[#3260C3] font-yekan-bold border-b border-b-[#3260C3] w-20 text-center'
                  : 'text-[#616161]'
              }`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTab;
