import { useZonesContext } from '@/context/ZonesContext';
import { Alarm, Buzzer } from '@/shared/assets/icons';
import { CustomSwitch, Text } from '@/shared/ui';
import { getStorage } from '@/utils/storage';
import { View } from 'react-native';

interface Props {
  zoneId: string;
  value: string;
  onChange: (value: 'BTH' | 'SPK' | 'SRN' | 'NON') => void;
}

const AlarmSetting: React.FC<Props> = ({ zoneId, value, onChange }) => {
  const zoneOutput = value;
  // وضعیت سوییچ آژیر
  const isAlarmOn = zoneOutput === 'BTH' || zoneOutput === 'SRN';

  // وضعیت سوییچ بلندگو
  const isBuzzerOn = zoneOutput === 'BTH' || zoneOutput === 'SPK';

  // ساخت state نهایی
  const buildOutputValue = (alarm: boolean, buzzer: boolean) => {
    if (alarm && buzzer) return 'BTH';

    if (alarm) return 'SRN';

    if (buzzer) return 'SPK';

    return 'NON';
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
      <Text className="text-sm font-yekan-bold text-[#020202]">نوع آلارم</Text>

      <View className="flex gap-4 mt-3">
        {/* آژیر */}
        <View className="border-b border-b-[#EFEFEF] w-full flex flex-row pb-3">
          <View className="flex flex-row gap-1 flex-1">
            <Alarm width={24} height={24} stroke="#FAAD14" />

            <View className="flex flex-col gap-6">
              <Text className="text-sm font-yekan-bold text-[#020202]">
                آژیر
              </Text>

              <Text className="text-[#616161] font-yekan-medium text-sm">
                فعال‌سازی آژیر زون
              </Text>
            </View>
          </View>

          <View className="relative justify-center items-center w-24 h-24 overflow-hidden">
            <View className="absolute opacity-10 rotate-[42deg]">
              <Alarm width={100} height={100} stroke="#FAAD14" />
            </View>

            <CustomSwitch
              value={isAlarmOn}
              activeColor="#3260C3"
              inactiveColor="#E2E2E2"
              inactiveThumbColor="#414141"
              activeThumbColor="#FFFFFF"
              showText
              textColorOn="#FFFFFF"
              textColorOff="#616161"
              size="xs"
              darkModeIcons={false}
              switchHandler={alarmSwitchHandler}
            />
          </View>
        </View>

        {/* بلندگو */}
        <View className="w-full flex flex-row">
          <View className="flex flex-row gap-1 flex-1">
            <Buzzer width={24} height={24} stroke="#3E9911" />

            <View className="flex flex-col gap-6">
              <Text className="text-sm font-yekan-bold text-[#020202]">
                بلندگو
              </Text>

              <Text className="text-[#616161] font-yekan-medium text-sm">
                فعال‌سازی بلندگو زون
              </Text>
            </View>
          </View>

          <View className="relative justify-center items-center w-24 h-24 overflow-hidden">
            <View className="absolute opacity-10 -rotate-[42deg]">
              <Buzzer width={100} height={200} stroke="#3E9911" />
            </View>

            <CustomSwitch
              value={isBuzzerOn}
              activeColor="#3260C3"
              inactiveColor="#E2E2E2"
              inactiveThumbColor="#414141"
              activeThumbColor="#FFFFFF"
              showText
              textColorOn="#FFFFFF"
              textColorOff="#616161"
              size="xs"
              darkModeIcons={false}
              switchHandler={buzzerSwitchHandler}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default AlarmSetting;
