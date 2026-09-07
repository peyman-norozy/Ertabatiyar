import { Pressable, View } from 'react-native';
import { CustomSwitch, Text } from '@/shared/ui';
import { Arrow, ArrowLeft, Setting, Signal } from '@/shared/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { getStorage } from '@/utils/storage';
import { useSms } from '@/context/SmsContext';
import type { ZoneKeyType } from '@/types/zone';
import { AppNavigation } from '@/helpers/appNavigation';
import { useZonesContext } from '@/context/ZonesContext';
import { useAuth } from '@/context/AuthContext';
import { useThemeMode } from '@/hook/useThemeMode';
import { useTranslation } from 'react-i18next';

interface SensorsCardProps {
  item: ZoneKeyType;
  value: string;
  status: string;
  output: string;
  enterDelay: string;
  exitDelay: string;
  active: boolean;
  title: string;
  onZoneAdded: () => void;
}

const SensorsCard: React.FC<SensorsCardProps> = ({
  item,
  active,
  title,
  value,
  status,
}) => {
  const { t } = useTranslation();

  const { sendSms, loading } = useSms();

  const { systemStatus, updateZone } = useZonesContext();

  const { logout } = useAuth();

  const navigation = useNavigation<AppNavigation>();

  const { isDark } = useThemeMode();

  const isOn = active;

  const isSystemDisarmed = systemStatus === 'D';

  /*
   * Zone Type
   *
   * N  = NORMAL
   * I  = INSTANT
   * 24 = 24 HOUR
   * S  = SILENT
   * F  = FIRE
   * D  = DELAY
   * O  = OFF
   */
  const zoneTypeValue: Record<string, string> = {
    N: t('zoneSettingsPage.status.normal'),
    I: t('zoneSettingsPage.status.instant'),
    '24': t('zoneSettingsPage.status.twentyFourHours'),
    S: t('zoneSettingsPage.status.silent'),
    F: t('zoneSettingsPage.status.warning'),
    D: t('zoneSettingsPage.status.withDelay'),
    O: t('zoneSettingsPage.status.off'),
  };

  /*
   * Zone Status
   *
   * I = IDLE
   * T = TRIGGERED
   */
  const zoneStatusValue: Record<string, string> = {
    I: t('zoneSettingsPage.zoneStatus.idle'),
    T: t('zoneSettingsPage.zoneStatus.triggered'),
  };

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
        devicePhoneNumber ?? '',
        `${password} ${zoneKey[item]}=${toggle ? 'OFF' : 'NORMAL'}`,
        `Zone_${item[1]}_set`,
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body === `Zone_${item[1]}_set`) {
        updateZone(item, toggle ? 'O' : 'N');
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  return (
    <View className="gap-3">
      {/* Top row */}

      <View className="flex-row-reverse justify-between items-center">
        <CustomSwitch
          value={isOn}
          activeColor="#3260C3"
          inactiveColor={isDark ? '#171717' : '#E5E7EB'}
          inactiveThumbColor="#4B5563"
          activeThumbColor={isDark ? '#000' : '#fff'}
          showText
          textColorOn="#FFFFFF"
          textColorOff={isDark ? '#fff' : '#6B7280'}
          size="xs"
          darkModeIcons={false}
          switchHandler={zoneSwitchHandler}
          disabled={loading}
          // loading={loading}
        />

        <View className="flex-row items-center gap-2">
          <Signal
            width={24}
            height={24}
            stroke={isOn ? '#22C55E' : '#6B7280'}
          />

          <Text className="text-black dark:text-white">{item}</Text>
        </View>
      </View>

      {/* Title */}

      <Text className="text-sm text-black dark:text-white font-yekan-bold mt-2">
        {title}
      </Text>

      {/* Zone type */}

      <Pressable
        onPress={() =>
          navigation.navigate('ZoneSettingsPage', {
            zoneId: item,
          })
        }
      >
        <View className="mt-3 flex-row justify-between gap-1">
          <View className="flex-row items-center gap-1">
            <Setting width={15} height={15} stroke="#6B7280" />
            <Text className="text-sm text-neutral-500 dark:text-neutral-400">
              {zoneTypeValue[value] ?? value}
            </Text>
          </View>
          <View className="rotate-180">
            <Arrow width={14} height={14} fill="#9CA3AF" />
          </View>
        </View>
      </Pressable>

      {/* Zone status */}

      {/* <Text className="text-xs text-neutral-400">
        {zoneStatusValue[status] ?? status}
      </Text> */}
    </View>
  );
};

export default SensorsCard;
