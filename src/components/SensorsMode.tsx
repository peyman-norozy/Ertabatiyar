import { View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import AnimatedButton from '@/components/AnimatedButton.tsx';
import { useZonesContext } from '@/context/ZonesContext';
import { useSms } from '@/hook/useSms';
import { getStorage, setStorage } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';
import { parseDeviceSms } from '@/utils/parseDeviceSms';
import { useState } from 'react';
import SensorsModeModal from './SensorsModeModal';

const SensorsMode = () => {
  const { systemStatus, reload } = useZonesContext();
  const { sendSms, loading } = useSms();
  const { logout } = useAuth();

  const [sensorModalVisible, setSensorModalVisible] = useState(false);
  const [systemSwitchCurrentValue, setsystemSwitchCurrentValue] = useState('');

  const isOn = systemStatus;
  const { t } = useTranslation();

  const items = [
    { title: t('sensorsItem.active' as any), value: 'ARM', disabled: loading },
    { title: t('sensorsItem.semiActive' as any), value: 'SEMIARM', disabled: loading },
    { title: t('sensorsItem.inactive' as any), value: 'DISARM', disabled: loading },
  ];

  const systemSwitchHandler = async (currentValue: string) => {
    if (isOn === currentValue) return;
    setsystemSwitchCurrentValue(currentValue);
    setSensorModalVisible(true);
  };

  const submitSensorsModeHandler = async () => {
    const devicePhoneNumber = await getStorage('devicePhoneNumber');
    const password = await getStorage('password');

    try {
      const sms = await sendSms(
        devicePhoneNumber ?? '',
        `${password} ${systemSwitchCurrentValue}`,
        'CALL:',
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body.includes('CALL:')) {
        const parsedData = parseDeviceSms(sms.body);
        await setStorage('deviceZones', JSON.stringify(parsedData));
        reload();
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }

    setSensorModalVisible(false);
  };

  return (
    <View
      className="
        mx-4 mt-6 p-4 gap-2 rounded-xl overflow-hidden
        border border-neutral-200 dark:border-neutral-700
        bg-white dark:bg-neutral-900
      "
    >
      {/* Title */}
      <Text className="text-base text-black dark:text-white font-yekan-bold">
        {t('mainPage.sensorsMode' as any)}
      </Text>

      {/* Description */}
      <Text className="text-xs text-neutral-500 dark:text-neutral-400 font-yekan-semibold">
        {t('mainPage.sensorsText' as any)}
      </Text>

      {/* Buttons */}
      <View className="flex-row justify-between mt-3">
        {items.map(item => (
          <AnimatedButton
            key={item.value}
            title={item.title}
            width={'w-28'}
            height={'h-11'}
            active={isOn === item.value}
            onPress={() => systemSwitchHandler(item.value)}
          />
        ))}
      </View>

      <SensorsModeModal
        visible={sensorModalVisible}
        onClose={() => setSensorModalVisible(false)}
        onConfirm={submitSensorsModeHandler}
        disabled={loading}
        loading={loading}
      />
    </View>
  );
};

export default SensorsMode;