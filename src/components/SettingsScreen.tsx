import { useState } from 'react';
import { View } from 'react-native';
import { CustomSwitch } from '@/shared/ui';
import { Text } from '@/shared/ui';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row items-center justify-between py-4">
        <Text className="text-base font-yekan text-gray-800 dark:text-gray-200">
          حالت تاریک
        </Text>
        <CustomSwitch
          value={darkMode}
          onValueChange={setDarkMode}
          size="lg"
          activeColor="#6366f1"
        />
      </View>

      <View className="flex-row items-center justify-between py-4 border-t border-gray-200 dark:border-gray-700">
        <Text className="text-base font-yekan text-gray-800 dark:text-gray-200">
          اعلان‌ها
        </Text>
        <CustomSwitch
          value={notifications}
          onValueChange={setNotifications}
          size="lg"
          activeColor="#10b981"
        />
      </View>

      <View className="flex-row items-center justify-between py-4 opacity-60">
        <Text className="text-base font-yekan text-gray-500 dark:text-gray-400">
          گزینه غیرفعال
        </Text>
        <CustomSwitch value={false} onValueChange={() => {}} disabled />
      </View>
    </View>
  );
}
