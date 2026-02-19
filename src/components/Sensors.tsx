import React from 'react';
import { View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

const Sensors = () => {
  const { t } = useTranslation();

  return (
    <View
      className={
        'mx-4 mt-6 border border-[#EFEFEF] rounded-lg overflow-hidden p-2 h-36 bg-[#EFEFEF]'
      }
    >
      <Text className={'text-base'}>{t('sensors.title' as any)}</Text>
    </View>
  );
};

export default Sensors;
