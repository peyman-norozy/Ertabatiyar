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

type ZoneEntry = {
  key: string;
  title: string;
  value: string;
  status: string;
  output: string;
  enterDelay: string;
  exitDelay: string;
  switchValue: boolean;
};

const Sensors = () => {
  const { t } = useTranslation();

  const { zones, reload, addedZones, loadAddedZones, systemStatus } =
    useZonesContext();

  const { modalVisible, selectedZone, mode, openAddModal, closeModal } =
    useZoneModalContext();

  useEffect(() => {
    const loadData = async () => {
      await reload();
      await loadAddedZones();
    };

    loadData();
  }, []);

  const zoneEntries = useMemo<ZoneEntry[]>(() => {
    return addedZones
      .map(zone => {
        const zoneData = zones[zone.key];

        return {
          key: zone.key,
          title: zone.title,

          // Zone type
          value: zoneData?.type ?? 'O',

          // Zone status
          status: zoneData?.status ?? 'I',

          // Zone output
          output: zoneData?.output ?? 'N',

          // Entry delay
          enterDelay: zoneData?.enterDelay ?? '0',

          // Exit delay
          exitDelay: zoneData?.exitDelay ?? '0',

          // O = OFF
          switchValue: zoneData?.type ? zoneData.type !== 'O' : false,
        };
      })
      .sort(
        (a, b) =>
          Number(a.key.replace('Z', '')) - Number(b.key.replace('Z', '')),
      );
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
        data={zoneEntries}
        numColumns={2}
        scrollEnabled={false}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          marginTop: 20,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: '50%',
              alignItems: 'center',
            }}
          >
            <View className="p-2 w-full">
              <View
                className="
                  bg-white dark:bg-neutral-800
                  border border-neutral-200 dark:border-neutral-700
                  rounded-2xl p-3
                "
              >
                <SensorsCard
                  item={item.key as ZoneKeyType}
                  value={item.value}
                  status={item.status}
                  output={item.output}
                  enterDelay={item.enterDelay}
                  exitDelay={item.exitDelay}
                  active={item.switchValue}
                  title={item.title}
                  onZoneAdded={loadAddedZones}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-5">
            <Text className="text-neutral-500 dark:text-neutral-400">
              {t('general.noSensors' as any)}
            </Text>
          </View>
        }
        ListFooterComponent={
          addedZones.length < 5 ? (
            <View
              style={{
                width: zoneEntries.length % 2 === 0 ? '100%' : '50%',
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
                      rounded-full p-2
                    "
                  >
                    <Add width={30} height={30} stroke="#9CA3AF" />
                  </TouchableOpacity>

                  <Text className="text-sm text-neutral-500 dark:text-neutral-400">
                    {t('general.sensorAdd')}
                  </Text>
                </View>
              </View>
            </View>
          ) : null
        }
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
