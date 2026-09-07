import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useSms } from '@/context/SmsContext';

const GlobalSmsLoader = () => {
  const { loading } = useSms();
  const { t } = useTranslation();

  if (!loading) {
    return null;
  }

  return (
    <View
      className="
        absolute inset-0
        z-[9998]
        items-center justify-center
        bg-black/40
      "
    >
      <View
        className="
          items-center justify-center
          rounded-2xl
          bg-white dark:bg-neutral-800
          px-8 py-6
        "
      >
        <ActivityIndicator size="large" />

        <Text className="mt-3 text-black dark:text-white font-yekan-semibold">
          {t('general.loading' as any)}
        </Text>
      </View>
    </View>
  );
};

export default GlobalSmsLoader;
