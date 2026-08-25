import { useThemeMode } from '@/hook/useThemeMode';
import { Alarm, Buzzer } from '@/shared/assets/icons';
import { CustomSwitch, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

interface Props {
  zoneId: string;
  value: string;
  onChange: (value: 'B' | 'P' | 'R' | 'N') => void;
}

const AlarmSetting: React.FC<Props> = ({ zoneId, value, onChange }) => {
  const { t } = useTranslation();
  const { isDark } = useThemeMode();

  const zoneOutput = value;

  // R = SIREN
  // B = BOTH
  const isAlarmOn = zoneOutput === 'B' || zoneOutput === 'R';

  // P = SPEAKER
  // B = BOTH
  const isBuzzerOn = zoneOutput === 'B' || zoneOutput === 'P';

  const buildOutputValue = (
    alarm: boolean,
    buzzer: boolean,
  ): 'B' | 'P' | 'R' | 'N' => {
    if (alarm && buzzer) {
      return 'B';
    }

    if (alarm) {
      return 'R';
    }

    if (buzzer) {
      return 'P';
    }

    return 'N';
  };

  const alarmSwitchHandler = (currentValue: boolean) => {
    const newAlarmState = !currentValue;

    const newOutputValue = buildOutputValue(newAlarmState, isBuzzerOn);

    onChange(newOutputValue);
  };

  const buzzerSwitchHandler = (currentValue: boolean) => {
    const newBuzzerState = !currentValue;

    const newOutputValue = buildOutputValue(isAlarmOn, newBuzzerState);

    onChange(newOutputValue);
  };

  return (
    <>
      <Text className="text-sm font-yekan-bold text-[#020202] dark:text-white">
        {t('general.alarmType')}
      </Text>

      <View className="flex gap-4 mt-3 relative">
        {/* Siren */}
        <View className="relative">
          <View
            className="absolute right-0 opacity-10 rotate-[42deg]"
            style={{
              top: -24,
            }}
          >
            <Alarm
              width={100}
              height={100}
              stroke="#FAAD14"
              fill={isDark ? '#000' : '#FFF1CA'}
            />
          </View>
        </View>

        <View className="border-b border-[#EFEFEF] dark:border-neutral-800 w-full flex flex-col gap-4 pb-4">
          <View className="flex flex-row justify-between w-full">
            <View className="flex flex-row items-center gap-2">
              <View>
                <Alarm
                  width={24}
                  height={24}
                  stroke="#FAAD14"
                  fill={isDark ? '#000' : '#FFF1CA'}
                />
              </View>

              <View className="flex flex-col gap-6">
                <Text className="text-sm font-yekan-bold text-[#020202] dark:text-white">
                  {t('general.siren')}
                </Text>
              </View>
            </View>

            <View>
              <CustomSwitch
                value={isAlarmOn}
                inactiveColor={isDark ? '#404040' : '#E5E7EB'}
                inactiveThumbColor="#4B5563"
                activeThumbColor={isDark ? '#000' : '#fff'}
                showText
                textColorOn="#FFFFFF"
                textColorOff={isDark ? '#fff' : '#6B7280'}
                size="xs"
                darkModeIcons={false}
                switchHandler={alarmSwitchHandler}
              />
            </View>
          </View>

          <Text className="text-[#616161] font-yekan-medium text-sm dark:text-gray-400">
            {t('general.sirenDescription')}
          </Text>
        </View>

        {/* Speaker */}
        <View className="relative justify-center items-center">
          <View
            className="absolute right-0 opacity-10 -rotate-[42deg]"
            style={{
              top: -64,
            }}
          >
            <Buzzer
              width={100}
              height={200}
              stroke="#3E9911"
              fill={isDark ? '#000' : '#FFF1CA'}
            />
          </View>
        </View>

        <View className="w-full flex flex-col gap-4 pb-4">
          <View className="flex flex-row justify-between w-full">
            <View className="flex flex-row items-center gap-2">
              <View>
                <Buzzer
                  width={24}
                  height={24}
                  stroke="#3E9911"
                  fill={isDark ? '#000' : '#FFF1CA'}
                />
              </View>

              <View className="flex flex-col gap-6">
                <Text className="text-sm font-yekan-bold text-[#020202] dark:text-white">
                  {t('general.speaker')}
                </Text>
              </View>
            </View>

            <View>
              <CustomSwitch
                value={isBuzzerOn}
                inactiveColor={isDark ? '#404040' : '#E5E7EB'}
                inactiveThumbColor="#4B5563"
                activeThumbColor={isDark ? '#000' : '#fff'}
                showText
                textColorOn="#FFFFFF"
                textColorOff={isDark ? '#fff' : '#6B7280'}
                size="xs"
                darkModeIcons={false}
                switchHandler={buzzerSwitchHandler}
              />
            </View>
          </View>

          <Text className="text-[#616161] font-yekan-medium text-sm dark:text-gray-400">
            {t('general.speakerDescription')}
          </Text>
        </View>
      </View>
    </>
  );
};

export default AlarmSetting;
