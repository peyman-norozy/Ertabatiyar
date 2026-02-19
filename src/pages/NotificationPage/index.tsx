import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { Text } from '@/shared/ui';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';

const NotificationPage = () => {
  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView>
        <View>
          <Text>aaaaaa</Text>
          <Text>sdfdsfjj</Text>
          <Text>sdfdsfjj</Text>
          <Text>sdfdsfjj</Text>
          <Text>sdfdsfjj</Text>
          <Text>sdfdsfjj</Text>
          <Text>sdfdsfjj</Text>
        </View>
      </ScrollView>

      <CustomBottomTab />
    </View>
  );
};

export default NotificationPage;
