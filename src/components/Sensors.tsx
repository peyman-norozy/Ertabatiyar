import { TouchableOpacity, View } from 'react-native';
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

  /**
   * Render single sensor card
   */
  const renderZone = (item: ZoneEntry) => {
    return (
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
    );
  };

  /**
   * Add zone button
   */
  const renderAddZone = (fullWidth = false) => {
    return (
      <View
        style={{
          width: fullWidth ? '100%' : '50%',
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
    );
  };

  /**
   * Build rows manually.
   *
   * Examples:
   *
   * 1 zone:
   * [ Zone 1 ][ Add ]
   *
   * 2 zones:
   * [ Zone 1 ][ Zone 2 ]
   * [          Add Zone          ]
   *
   * 3 zones:
   * [ Zone 1 ][ Zone 2 ]
   * [ Zone 3 ][ Add ]
   *
   * 4 zones:
   * [ Zone 1 ][ Zone 2 ]
   * [ Zone 3 ][ Zone 4 ]
   *
   * 5 zones:
   * [ Zone 1 ][ Zone 2 ]
   * [ Zone 3 ][ Zone 4 ]
   * [ Zone 5 ][          ]
   */
  const renderZoneRows = () => {
    const rows: React.ReactNode[] = [];

    for (let i = 0; i < zoneEntries.length; i += 2) {
      const firstZone = zoneEntries[i];
      const secondZone = zoneEntries[i + 1];

      rows.push(
        <View
          key={`row-${i}`}
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          {renderZone(firstZone)}

          {secondZone ? (
            renderZone(secondZone)
          ) : addedZones.length < 5 ? (
            renderAddZone(false)
          ) : (
            <View style={{ width: '50%' }} />
          )}
        </View>,
      );
    }

    /**
     * If the number of zones is even and there are
     * still available slots, put Add Zone on a new
     * full-width row.
     *
     * Example:
     *
     * [ Zone 1 ][ Zone 2 ]
     * [       Add Zone       ]
     */
    if (
      zoneEntries.length > 0 &&
      zoneEntries.length % 2 === 0 &&
      addedZones.length < 5
    ) {
      rows.push(
        <View
          key="add-zone-full-row"
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          {renderAddZone(true)}
        </View>,
      );
    }

    /**
     * When there are zero zones,
     * show Add Zone as full width.
     */
    if (zoneEntries.length === 0 && addedZones.length < 5) {
      rows.push(
        <View
          key="add-zone-empty"
          style={{
            width: '100%',
            flexDirection: 'row',
          }}
        >
          {renderAddZone(true)}
        </View>,
      );
    }

    return rows;
  };

  return (
    <View
      className="
        mx-4 mt-6 p-4 rounded-xl
        bg-[#EFEFEF] dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-700
      "
    >
      <Text className="text-base font-medium mb-3 text-black dark:text-white">
        {t('sensors.title' as any)}
      </Text>

      <View className="mt-5">{renderZoneRows()}</View>

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
