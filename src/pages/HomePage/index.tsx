import { View, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import SensorsMode from '@/components/SensorsMode.tsx';
import Sensors from '@/components/Sensors.tsx';
import CallMode from '@/components/CallMode.tsx';
import Admin from '@/components/Admin.tsx';

const HomePage = () => {

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        <View className="w-full h-72 pt-10">
          <ImageBackground
            source={require('../../shared/assets/images/banner_main.png')}
            resizeMode="cover"
            className="w-full h-full justify-end"
          >
          </ImageBackground>
        </View>
        <SensorsMode />
        <Sensors />
        <CallMode />
        <Admin />
      </ScrollView>
      <CustomBottomTab />
    </View>
  );
};

export default HomePage;
