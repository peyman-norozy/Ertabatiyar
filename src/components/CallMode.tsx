import { Image, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';
import { useZonesContext } from '@/context/ZonesContext';
import { getStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';

const CallMode = () => {
  const { call, updateZone } = useZonesContext();
  const { sendSms, loading } = useSms();

  const isOn = call['CALL'] !== 'OFF';

  const callSwitchHandler = async (currentValue: boolean) => {
    const devicePhoneNumber = await getStorage('devicePhoneNumber');
    const password = await getStorage('password');

    const newValue = !currentValue;
    try {
      const sms = await sendSms(
        devicePhoneNumber ? devicePhoneNumber : '',
        `${password} CALL${newValue ? 'ON' : 'OFF'}`,
        `call_function_${newValue ? 'enabled.' : 'disabled.'}`,
        ['access_denied'],
      );

      if (sms.body === `call_function_${newValue ? 'enabled.' : 'disabled.'}`) {
        updateZone('CALL', newValue ? 'ON' : 'OFF');
      }
    } catch (e) {
      console.log('SMS failed:', e);
    }
  };
  return (
    <View
      className={
        'bg-[#C6DFF7] mx-4 mt-6 rounded-lg p-3 flex-row items-center justify-between'
      }
    >
      <View className={'flex-row items-center gap-2'}>
        <Image
          source={require('../shared/assets/icons/calling.gif')}
          className={'w-10 h-10'}
        />

        <Text className={'text-[#020202] text-base'} font={'font-yekan-medium'}>
          حالت تماس
        </Text>
      </View>
      <CustomSwitch
        value={isOn}
        activeColor="#3E9911"
        inactiveColor={'#E2E2E2'}
        inactiveThumbColor={'#414141'}
        activeThumbColor={'#FFFFFF'}
        showText={true}
        textColorOn={'#FFFFFF'}
        textColorOff={'#616161'}
        size={'xs'}
        darkModeIcons={false}
        switchHandler={callSwitchHandler}
        disabled={loading}
        loading={loading}
      />
    </View>
  );
};

export default CallMode;
