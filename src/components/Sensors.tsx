import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import SensorsCard from '@/components/card/SensorsCard.tsx';
import type { ZoneKeyType } from '@/types/zone';
import { useZonesContext } from '@/context/ZonesContext';
import { useEffect } from 'react';
import { Add } from '@/shared/assets/icons';
import AddZoneModal from '@/components/AddZoneModal.tsx';
import { useZoneModalContext } from '@/context/ZoneModalContext';

export type AddedZone = {
  key: string;
  title: string;
};

const Sensors = () => {
  const { t } = useTranslation();
  const { zones, reload, addedZones, loadAddedZones } = useZonesContext();
  const { modalVisible, selectedZone, mode, openAddModal, closeModal } =
    useZoneModalContext();
  console.log(modalVisible, 'skjdfdueuegfgfytyt');
  const zoneEntries = addedZones
    .map(zone => {
      const zoneValue = zones[zone.key];

      return {
        key: zone.key,
        title: zone.title,
        value: zoneValue,
        switchValue: zoneValue !== 'OFF',
      };
    })
    .filter(item => item.value);

  useEffect(() => {
    const loadData = async () => {
      await reload();

      await loadAddedZones();
    };

    loadData();
  }, []);

  console.log(zoneEntries, addedZones, 'sdfjueuegfgftrrtrytyuiu');

  const sort = () => {
    const c = zoneEntries.sort(
      (a: any, b: any) =>
        Number(a.key.split('')[1]) - Number(b.key.split('')[1]),
    );
    return c;
  };
  console.log(sort(), 'sort');

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
        {sort().map((item, index) => {
          return (
            <View key={index} className="w-1/2 px-3 pb-3">
              <View className="bg-white border border-[#EFEFEF] rounded-2xl py-3 px-2">
                <SensorsCard
                  item={item.key as ZoneKeyType}
                  value={item.value}
                  active={item.switchValue}
                  title={item.title}
                  onZoneAdded={async () => {
                    await loadAddedZones();
                  }}
                />
              </View>
            </View>
          );
        })}
        {addedZones.length < 5 && (
          <View
            className={`flex items-center gap-3 ${
              addedZones.length === 0 ? 'w-full mb-4' : 'w-1/2'
            }`}
          >
            <TouchableOpacity
              onPress={openAddModal}
              className={
                'flex justify-center items-center mt-4 bg-[#E8E8E8] rounded-full'
              }
            >
              <Add width={58} height={58} />
            </TouchableOpacity>
            <Text className="text-[#616161] font-yekan-medium text-sm">
              افزودن حسگرها
            </Text>
          </View>
        )}
        <AddZoneModal
          visible={modalVisible}
          onClose={closeModal}
          mode={mode}
          selectedZone={selectedZone}
          onZoneAdded={async () => {
            await loadAddedZones();
          }}
        />
      </View>
    </View>
  );
};

export default Sensors;
