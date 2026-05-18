import { Pressable, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';
import { ArrowLeft, Setting, Signal } from '@/shared/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { getStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import type { ZoneKeyType } from '@/types/zone';
import { AppNavigation } from '@/helpers/appNavigation';
import { useZonesContext } from '@/context/ZonesContext';
import { useAuth } from '@/context/AuthContext';

interface SenesorsCardtypeProps {
  item: ZoneKeyType;
  value: string;
  active: boolean;
  title: string;
  onZoneAdded: () => void;
}

const zoneValue: Record<string, string> = {
  N: 'وضعیت عادی',
  I: 'وضعیت بی صدا',
  '24H': 'وضعیت ۲۴ ساعته',
  D: 'وضعیت با تاخیر',
  F: 'وضعیت هشدار',
  OFF: 'وضعیت خاموش',
};

const SensorsCard: React.FC<SenesorsCardtypeProps> = ({
  item,
  active,
  title,
  value,
}) => {
  const { sendSms, loading } = useSms();
  const { systemStatus, updateZone } = useZonesContext();
  const { logout } = useAuth();

  const isOn = active;
  const isSystemOn = systemStatus;

  const navigation = useNavigation<AppNavigation>();

  const zoneSwitchHandler = async (toggle: boolean) => {
    const devicePhoneNumber = await getStorage('devicePhoneNumber');
    const password = await getStorage('password');
    const zoneKey: Record<ZoneKeyType, string> = {
      Z1: 'ZONE1',
      Z2: 'ZONE2',
      Z3: 'ZONE3',
      Z4: 'ZONE4',
      Z5: 'ZONE5',
    };

    try {
      const sms = await sendSms(
        devicePhoneNumber ? devicePhoneNumber : '',
        `${password} ${zoneKey[item]}=${toggle ? 'OFF' : 'NORMAL'}`,
        `Zone_${item.split('')[1]}_set`,
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body === `Zone_${item.split('')[1]}_set`) {
        updateZone(item as ZoneKeyType, toggle ? 'OFF' : 'N');
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  return (
    <View>
      <View className={'flex-row-reverse justify-between'}>
        <CustomSwitch
          value={isOn}
          activeColor="#3260C3"
          inactiveColor={'#E2E2E2'}
          inactiveThumbColor={'#414141'}
          activeThumbColor={'#FFFFFF'}
          showText={true}
          textColorOn={'#FFFFFF'}
          textColorOff={'#616161'}
          size={'xs'}
          darkModeIcons={false}
          switchHandler={zoneSwitchHandler}
          disabled={loading || isSystemOn === 'DISARM'}
          loading={loading}
        />
        <View className="flex flex-row items-center gap-2">
          <Signal
            width={24}
            height={24}
            stroke={isOn ? '#3E9911' : '#616161'}
          />
          <Text>{item}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text
          className={'text-[#020202] mt-4 text-sm'}
          font={'font-yekan-medium'}
        >
          {title}
        </Text>
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('ZoneSettingsPage', {
            zoneId: item,
          })
        }
      >
        <View className={'mt-4 flex-row items-center gap-1'}>
          <Setting width={15} height={15} />
          <Text className={'text-[#616161] text-sm'} font={'font-yekan-medium'}>
            {zoneValue[value]}
          </Text>
          <ArrowLeft width={14} height={14} />
        </View>
      </Pressable>
    </View>
  );
};

export default SensorsCard;
