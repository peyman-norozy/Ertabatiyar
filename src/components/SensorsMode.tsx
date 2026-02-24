import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import AnimatedButton from '@/components/AnimatedButton.tsx';

const SensorsMode = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const items = [
    t('sensorsItem.active' as any),
    t('sensorsItem.semiActive' as any),
    t('sensorsItem.inactive' as any),
  ];

  return (
    <View
      className={
        'mx-4 mt-6 border border-[#EFEFEF] rounded-lg overflow-hidden p-2 h-36 bg-[#FFFFFF]'
      }
    >
      <View>
        <Text className={'text-base text-[#020202]'}>
          {t('mainPage.sensorsMode' as any)}
        </Text>
      </View>
      <View className={'mt-1'}>
        <Text className={'text-[#616161] text-xs'}>
          {t('mainPage.sensorsText' as any)}
        </Text>
      </View>
      <View className="flex-row justify-between px-5 mt-3">
        {items.map((item, index) => (
          <AnimatedButton
            key={index}
            title={item}
            width={'w-28'}
            height={'h-11'}
            active={active === index}
            onPress={() => setActive(index)}
          />
        ))}
      </View>
    </View>
  );
};

export default SensorsMode;
