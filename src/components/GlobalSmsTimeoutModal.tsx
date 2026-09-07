import React from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useSms } from '@/context/SmsContext';

const GlobalSmsTimeoutModal = () => {
  const { timeoutModalVisible, closeTimeoutModal } = useSms();
  const { t } = useTranslation();

  if (!timeoutModalVisible) {
    return null;
  }

  return (
    <View
      className="
        absolute inset-0
        z-[10000]
        items-center justify-center
        bg-black/50
        px-6
      "
    >
      <View
        className="
          w-full
          max-w-[360px]
          items-center
          rounded-3xl
          bg-white
          px-7
          py-8
          dark:bg-neutral-800
        "
      >
        {/* Icon */}
        <View
          className="
            mb-5
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-orange-100
            dark:bg-orange-900/30
          "
        >
          <Text className="text-3xl">⏱</Text>
        </View>

        {/* Title */}
        <Text
          className="
            text-center
            text-xl
            font-yekan-semibold
            text-black
            dark:text-white
          "
        >
          {t('general.messages.smsTimeoutTitle' as any)}
        </Text>

        {/* Description */}
        <Text
          className="
            mt-3
            text-center
            text-sm
            leading-6
            text-gray-500
            dark:text-gray-300
          "
        >
          {t('general.messages.smsTimeoutMessage' as any)}
          {'\n'}
          {t('general.messages.smsTimeoutDescription' as any)}
        </Text>

        {/* Button */}
        <Pressable
          onPress={closeTimeoutModal}
          className="
            mt-7
            w-full
            items-center
            rounded-2xl
            bg-blue-600
            py-4
            active:opacity-80
          "
        >
          <Text
            className="
              font-yekan-semibold
              text-base
              text-white
            "
          >
            {t('general.messages.understood' as any)}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GlobalSmsTimeoutModal;
