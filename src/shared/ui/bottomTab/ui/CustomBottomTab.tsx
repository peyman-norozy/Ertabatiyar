import React from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuIcon } from "@/shared/assets/icons";

type TabType = {
  id: string;
  icon: React.ReactNode;
  label: string;
};

type RootStackParamList = {
  HomePage: undefined;
  Search: undefined;
  ProfilePage: undefined;
};

const CustomBottomTab = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute(); // 🟢 اینجا route فعلی رو می‌گیریم
  const scaleValue = new Animated.Value(1);

  const tabs: TabType[] = [
    {
      id: "HomePage",
      icon: <MenuIcon width={24} height={24} />,
      label: "خانه",
    },
    {
      id: "Search",
      icon: <MenuIcon width={24} height={24} />,
      label: "جستجو",
    },
    {
      id: "ProfilePage",
      icon: <MenuIcon width={24} height={24} />,
      label: "پروفایل",
    },
  ];

  const handlePress = (tabId: string) => {
    if (route.name !== tabId) {
      navigation.navigate(tabId as keyof RootStackParamList);

      // Tap animation
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
      {tabs.map((tab) => {
        const isActive = route.name === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            onPress={() => handlePress(tab.id)}
            className="items-center justify-center pt-2"
            activeOpacity={0.7}
          >
            <Animated.View
              style={{
                transform: [{ scale: isActive ? scaleValue : 1 }],
                opacity: isActive ? 1 : 0.6,
              }}
              className="items-center"
            >
              {tab.icon}
            </Animated.View>
            <Text
              className={`text-xs mt-1 ${
                isActive ? "text-red-400 font-bold" : "text-gray-500"
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
