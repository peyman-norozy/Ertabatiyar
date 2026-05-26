import { FlatList, TouchableOpacity, View } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import SensorsCard from '@/components/card/SensorsCard.tsx';
import type { ZoneKeyType } from '@/types/zone';
import { useZonesContext } from '@/context/ZonesContext';
import { useEffect, useMemo } from 'react';
import { Add } from '@/shared/assets/icons';
import AddZoneModal from '@/components/AddZoneModal.tsx';
import { useZoneModalContext } from '@/context/ZoneModalContext';

const Sensors = () => {
  const { t } = useTranslation();
  const { zones, reload, addedZones, loadAddedZones } = useZonesContext();

  const { modalVisible, selectedZone, mode, openAddModal, closeModal } =
    useZoneModalContext();

  useEffect(() => {
    const loadData = async () => {
      await reload();
      await loadAddedZones();
    };

    loadData();
  }, []);

  const zoneEntries = useMemo(() => {
    return addedZones
      .map(zone => {
        const zoneValue = zones[zone.key];

        return {
          key: zone.key,
          title: zone.title,
          value: zoneValue,
          switchValue: zoneValue !== 'OFF',
        };
      })
      .filter(item => item.value)
      .sort((a, b) => Number(a.key[1]) - Number(b.key[1]));
  }, [addedZones, zones]);

  return (
    <View
      className="
        mx-4 mt-6 p-4 rounded-xl
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-700
      "
    >
      <Text className="text-base font-medium mb-3 text-black dark:text-white">
        {t('sensors.title' as any)}
      </Text>

      <FlatList
        data={
          addedZones.length < 5
            ? [...zoneEntries, { key: 'add-card', isAddCard: true }]
            : zoneEntries
        }
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          marginTop: 20,
        }}
        renderItem={({ item, index }) => {
          const isLastSingleAdd =
            'isAddCard' in item && zoneEntries.length % 2 === 0;

          if ('isAddCard' in item) {
            return (
              <View
                style={{
                  width: isLastSingleAdd ? '100%' : '50%',
                  alignItems: 'center',
                }}
              >
                <View className="p-2 w-full mt-1">
                  <View
                    className="
                flex items-center justify-center gap-3
                border-2 border-dashed
                border-neutral-300 dark:border-neutral-600
                rounded-2xl p-6
                bg-white dark:bg-neutral-900
              "
                  >
                    <TouchableOpacity
                      onPress={openAddModal}
                      className="
                  bg-neutral-200 dark:bg-neutral-700
                  rounded-full p-2"
                    >
                      <Add width={30} height={30} stroke={'#9CA3AF'} />
                    </TouchableOpacity>

                    <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                      {t('general.sensorAdd')}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }

          return (
            <View style={{ width: '50%', alignItems: 'center' }}>
              <View className="p-2 w-full">
                <View className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-3">
                  <SensorsCard
                    item={item.key as ZoneKeyType}
                    value={item.value}
                    active={item.switchValue}
                    title={item.title}
                    onZoneAdded={loadAddedZones}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
      <AddZoneModal
        visible={modalVisible}
        onClose={closeModal}
        mode={mode}
        selectedZone={selectedZone}
        onZoneAdded={loadAddedZones}
      />
    </View>
  );
};

export default Sensors;
