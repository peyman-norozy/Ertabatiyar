import { View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import AnimatedButton from '@/components/AnimatedButton.tsx';
import { useZonesContext } from '@/context/ZonesContext';
import { useSms } from '@/hook/useSms';
import { getStorage } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';

const SensorsMode = () => {
  const { system, updateZone } = useZonesContext();
  const { sendSms, loading } = useSms();
  const { logout } = useAuth();

  const isOn = system['SYS'];

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
    const devicePhoneNumber = await getStorage('devicePhoneNumber');
    const password = await getStorage('password');
    const systemMap: Record<string, string> = {
      ARM: 'system_armed.',
      DISARM: 'system_disarmed.',
      SEMIARM: 'system_semiarmed.',
    };

    try {
      const sms = await sendSms(
        devicePhoneNumber ? devicePhoneNumber : '',
        `${password} ${currentValue}`,
        `${systemMap[currentValue]}`,
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body === `${systemMap[currentValue]}`) {
        updateZone('SYS', currentValue);
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
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
            disabled={item.disabled}
            loading={item.disabled}
          />
        ))}
      </View>
    </View>
  );
};

export default SensorsMode;
