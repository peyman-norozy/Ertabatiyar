import React from 'react';
import { View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import SensorsCard from '@/components/card/SensorsCard.tsx';

const Sensors = () => {
  const { t } = useTranslation();
  const data = [0, 0, 0, 0, 0];

  return (
    <View
      className={
        'mx-4 mt-6 border border-[#EFEFEF] rounded-lg overflow-hidden p-4 bg-[#EFEFEF]'
      }
    >
      <Text className="text-base font-medium mb-3">
        {t('sensors.title' as any)}
      </Text>

      <View className="flex-row flex-wrap -mx-4 -mb-4">
        {data.map((item, index) => (
          <View key={index} className="w-1/2 px-3 pb-3">
            <View className="bg-white border border-[#EFEFEF] rounded-2xl py-3 px-2">
              <SensorsCard />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Sensors;
