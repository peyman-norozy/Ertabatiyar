import { View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import SensorsCard from '@/components/card/SensorsCard.tsx';
import type { ZoneKeyType } from '@/types/zone';
import { useZones } from '@/hook/useZones';

const Sensors = () => {
  const { t } = useTranslation();
  const { zones } = useZones();

  const zoneEntries = Object.entries(zones);
  console.log(zoneEntries, 'aajajnnnghgghhhh');
  return (
    <View
      className={
        'mx-4 mt-6 border border-[#EFEFEF] rounded-lg overflow-hidden p-4 bg-[#EFEFEF]'
      }
    >
      <Text className="text-base font-medium mb-3">
        {t('sensors.title' as any)}
      </Text>

      <View className="flex-row flex-wrap -mx-4 -mb-4">
        {zoneEntries.map(([key, value], index) => (
          <View key={index} className="w-1/2 px-3 pb-3">
            <View className="bg-white border border-[#EFEFEF] rounded-2xl py-3 px-2">
              <SensorsCard item={key as ZoneKeyType} value={value || ''} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Sensors;
