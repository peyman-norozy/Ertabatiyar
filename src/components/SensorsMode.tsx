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
    {
      title: t('sensorsItem.semiActive' as any),
      value: 'SEMIARM',
      disabled: loading,
    },
    {
      title: t('sensorsItem.inactive' as any),
      value: 'DISARM',
      disabled: loading,
    },
  ];

  const systemSwitchHandler = async (currentValue: string) => {
    if (isOn === currentValue) return;
    setsystemSwitchCurrentValue(currentValue);
    setSensorModalVisible(true);
  };

  const submitSensorsModeHandler = async () => {
    const devicePhoneNumber = await getStorage('devicePhoneNumber');
    const password = await getStorage('password');
    // const systemMap: Record<string, string> = {
    //   ARM: 'system_armed.',
    //   DISARM: 'system_disarmed.',
    //   SEMIARM: 'system_semiarmed.',
    // };

    try {
      const sms = await sendSms(
        devicePhoneNumber ? devicePhoneNumber : '',
        `${password} ${systemSwitchCurrentValue}`,
        'CALL:',
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body.includes('CALL:')) {
        const parsedData = parseDeviceSms(sms.body);
        await setStorage('deviceZones', JSON.stringify(parsedData));
        reload();
        // updateZone('SYS', systemSwitchCurrentValue);
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
        {items.map(item => (
          <AnimatedButton
            key={item.value}
            title={item?.title}
            width={'w-28'}
            height={'h-11'}
            active={isOn == item.value}
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
