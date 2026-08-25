import { View, StatusBar, ScrollView, ImageBackground } from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import SensorsMode from '@/components/SensorsMode.tsx';
import Sensors from '@/components/Sensors.tsx';
import CallMode from '@/components/CallMode.tsx';
import Admin from '@/components/Admin.tsx';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
  const { i18n, t } = useTranslation();

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View className="w-full h-72 pt-10">
          <ImageBackground
            source={
              i18n.language === 'fa'
                ? require('../../shared/assets/images/banner_main_right.png')
                : require('../../shared/assets/images/banner_main_left.png')
            }
            resizeMode="cover"
            className="w-full h-full"
          >
            {/* Overlay */}
            <View className="absolute inset-0 bg-black/10 dark:bg-black/40" />

            {/* Text */}
            <View className={`absolute top-0 bottom-0 justify-center left-6`}>
              <Text
                className={`text-white text-xl font-yekan-bold ${
                  i18n.language === 'fa' ? 'text-left' : 'text-right'
                }`}
              >
                {t('banner.advancedControl')}
              </Text>
              <Text
                className={`text-white text-lg font-yekan mt-9 ${
                  i18n.language === 'fa' ? 'text-left' : 'text-right'
                }`}
              >
                {t('banner.smartResponse')}
              </Text>
              <Text
                className={`text-white text-lg font-yekan ${
                  i18n.language === 'fa' ? 'text-left' : 'text-right'
                }`}
              >
                {t('banner.secureSecurity')}
              </Text>
            </View>
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
