import { View, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import SensorsMode from '@/components/SensorsMode.tsx';
import Sensors from '@/components/Sensors.tsx';
import CallMode from '@/components/CallMode.tsx';
import Admin from '@/components/Admin.tsx';

const HomePage = () => {
  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View className="w-full h-72 pt-10">
          <ImageBackground
            source={require('../../shared/assets/images/banner_main.png')}
            resizeMode="cover"
            className="w-full h-full justify-end"
          >
            {/* overlay برای dark mode */}
            <View className="absolute inset-0 bg-black/10 dark:bg-black/40" />
          </ImageBackground>
        </View>

        <View className="bg-white dark:bg-neutral-900">
          <SensorsMode />
          <Sensors />
          <CallMode />
          <Admin />
        </View>
      </ScrollView>

      <CustomBottomTab />
    </View>
  );
};

export default HomePage;