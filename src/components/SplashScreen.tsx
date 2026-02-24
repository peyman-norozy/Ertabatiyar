import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const SplashScreen = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <ActivityIndicator size="large" color="#3260C3" />
      <Text className="mt-4 text-lg font-bold text-[#3260C3]">
        در حال بارگذاری...
      </Text>
    </View>
  );
};

export default SplashScreen;
