import { View, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import SensorsMode from '@/components/SensorsMode.tsx';
import Sensors from '@/components/Sensors.tsx';
import CallMode from '@/components/CallMode.tsx';
import Admin from '@/components/Admin.tsx';
import { Text } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { t } = useTranslation();

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
            <View className="absolute inset-0 bg-black/30" />

            <View className="px-5 pb-6 absolute top-14 flex-col gap-5">
              <Text className="text-white text-xl font-yekan-medium">
                {t('banner.advancedControl')}
              </Text>

              <Text className="text-white text-sm font-yekan-medium mt-2 opacity-90">
                {t('banner.advancedControlDescription')}
              </Text>
            </View>
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
