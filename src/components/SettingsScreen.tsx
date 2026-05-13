import { useState } from 'react';
import { View } from 'react-native';
import { CustomSwitch } from '@/shared/ui';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center justify-between py-4">
        <Text className="text-base font-yekan text-gray-800 dark:text-gray-200">
          {t('general.darkMode')}
        </Text>
        <CustomSwitch
          value={darkMode}
          switchHandler={setDarkMode}
          size="lg"
          activeColor="#3260C3"
        />
      </View>

      <View className="flex-row items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
        <Text className="text-base font-yekan text-gray-800 dark:text-gray-200">
          {t('general.notifications')}
        </Text>
        <CustomSwitch
          value={notifications}
          switchHandler={setNotifications}
          size="lg"
          activeColor="#3260C3"
        />
      </View>

      <View className="flex-row items-center justify-between py-4 opacity-60">
        <Text className="text-base font-yekan text-gray-500 dark:text-gray-400">
          {t('general.disabledOption')}
        </Text>
        <CustomSwitch value={false} switchHandler={() => {}} disabled />
      </View>
    </View>
  );
}
