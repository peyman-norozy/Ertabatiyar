import React, { useState, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';
import { ArrowLeft, Setting, Signal } from '@/shared/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, RootDrawerParamList } from '@/shared/ui/header/model';
import { getStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import type { ZoneKeyType } from '@/types/zone';
import { useZones } from '@/hook/useZones';

interface SenesorsCardtypeProps {
  item: ZoneKeyType;
  value: string;
}

const SensorsCard: React.FC<SenesorsCardtypeProps> = ({ item, value }) => {
  const [notifications, setNotifications] = useState(value !== 'OFF');
  const navigation = useNavigation<NavigationProp>();
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const { sendSms, setAllowedNumber, lastSms, loading } = useSms();
  const { updateZone } = useZones();

  useEffect(() => {
    (async () => {
      const device = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');
      device ? setDevicePhoneNumber(device) : null;
      password ? setPassword(password) : null;
    })();
  }, []);

  useEffect(() => {
    setNotifications(value !== 'OFF');
  }, [value]);

  const zoneSwitchHandler = async (toggle: boolean) => {
    const zoneKey: Record<ZoneKeyType, string> = {
      Z1: 'ZONE1',
      Z2: 'ZONE2',
      Z3: 'ZONE3',
      Z4: 'ZONE4',
      Z5: 'ZONE5',
    };
    const zoneValue = {
      N: 'NORMAL',
      I: 'INSTANT',
      '24H': '24HOUR',
      D: 'DELAY',
      F: 'FIRE',
    };

    try {
      const sms = await sendSms(
        devicePhoneNumber,
        `${password} ${zoneKey[item]}=${toggle ? 'OFF' : 'NORMAL'}`,
        `Zone_${item.split('')[1]}_set`,
        ['access_denied'],
      );

      if (sms.body === `Zone_${item.split('')[1]}_set`) {
        updateZone(item as ZoneKeyType, toggle ? 'OFF' : 'N');
        setNotifications(!toggle);
      }
    } catch (e) {
      console.log('SMS failed:', e);
    }
  };
  console.log(loading, 'sdfjueueu');

  console.log(notifications, 'sdfjnnbnbnbhh');

  return (
    <View>
      <View className={'flex-row-reverse justify-between'}>
        <CustomSwitch
          value={notifications}
          onValueChange={setNotifications}
          activeColor="#3E9911"
          inactiveColor={'#E2E2E2'}
          inactiveThumbColor={'#414141'}
          activeThumbColor={'#FFFFFF'}
          showText={true}
          textColorOn={'#FFFFFF'}
          textColorOff={'#616161'}
          size={'xs'}
          darkModeIcons={false}
          switchHandler={zoneSwitchHandler}
          disabled={loading}
          loading={loading}
        />
        <Signal
          width={24}
          height={24}
          stroke={notifications ? '#3E9911' : '#616161'}
        />
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('ZoneSettingsPage' as keyof RootDrawerParamList)
        }
      >
        <View>
          <Text
            className={'text-[#020202] mt-4 text-sm'}
            font={'font-yekan-medium'}
          >
            عنوان ۱
          </Text>
        </View>
        <View className={'mt-4 flex-row items-center gap-1'}>
          <Setting width={15} height={15} />
          <Text className={'text-[#616161] text-sm'} font={'font-yekan-medium'}>
            واکنش اضطراری
          </Text>
          <ArrowLeft width={14} height={14} />
        </View>
      </Pressable>
    </View>
  );
};

export default SensorsCard;
