import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { Button, Input, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { getStorage, setStorage } from '@/utils/storage';
import { BlueAdd, BlueEdit } from '@/shared/assets/icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { useColorScheme } from 'nativewind';

type Props = {
  visible: boolean;
  onClose: () => void;
  onZoneAdded: () => void;
  mode?: 'add' | 'edit';
  selectedZone?: {
    key: string;
    title: string;
  } | null;
};

const AddZoneModal: React.FC<Props> = ({
  visible,
  onClose,
  onZoneAdded,
  mode = 'add',
  selectedZone,
}) => {
  const { t } = useTranslation();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const initialZoneNumber =
    mode === 'edit' && selectedZone ? selectedZone.key.replace('Z', '') : '';

  const initialZoneName =
    mode === 'edit' && selectedZone ? selectedZone.title : '';

  const [open, setOpen] = useState(false);
  const [zoneNumber, setZoneNumber] = useState<string | null>(
    initialZoneNumber,
  );

  const [zoneName, setZoneName] = useState(initialZoneName);

  const [items, setItems] = useState([
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
  ]);

  useEffect(() => {
    const loadUsedZones = async () => {
      const savedZones = await getStorage('addedZones');
      const parsedZones = savedZones ? JSON.parse(savedZones) : [];

      const usedNumbers = parsedZones.map((z: any) => z.key.replace('Z', ''));

      const filtered = [1, 2, 3, 4, 5]
        .map(num => ({ label: String(num), value: String(num) }))
        .filter(item => {
          if (mode === 'edit' && selectedZone?.key === `Z${item.value}`) {
            return true;
          }

          return !usedNumbers.includes(item.value);
        });
      setZoneNumber(initialZoneNumber);
      setZoneName(initialZoneName);
      setItems(filtered);
    };

    if (visible) loadUsedZones();
  }, [visible, mode, selectedZone]);

  const handleSubmit = async () => {
    if (!zoneNumber || !zoneName) return;

    const savedZones = await getStorage('addedZones');
    const parsedZones = savedZones ? JSON.parse(savedZones) : [];

    if (mode === 'edit' && selectedZone) {
      const updated = parsedZones.map((z: any) =>
        z.key === selectedZone.key ? { ...z, title: zoneName } : z,
      );

      await setStorage('addedZones', JSON.stringify(updated));
      onZoneAdded();
      onClose();
      return;
    }

    const zoneKey = `Z${zoneNumber}`;

    if (parsedZones.some((z: any) => z.key === zoneKey)) return;

    const updated = [...parsedZones, { key: zoneKey, title: zoneName }];

    await setStorage('addedZones', JSON.stringify(updated));
    onZoneAdded();
    onClose();
  };

  return (
    <Modal visible={visible} backdropColor="#000000a3" animationType="fade">
      <View className="flex-1 justify-center items-center px-5">
        <View className="bg-white dark:bg-neutral-900 w-full rounded-3xl p-5">
          <View className="flex items-center justify-center mb-4">
            <View className="bg-[#8CC8FF33] p-4 rounded-full">
              {mode === 'edit' ? (
                <BlueEdit width={36} height={36} stroke="#1890FF" />
              ) : (
                <BlueAdd width={38} height={38} stroke="#1890FF" />
              )}
            </View>
          </View>

          <Text className="mb-2 dark:text-white">{t('sensors.number')}</Text>
          {mode !== 'edit' ? (
            <DropDownPicker
              open={open}
              value={zoneNumber}
              setOpen={setOpen}
              setValue={setZoneNumber}
              items={items}
              setItems={setItems}
              placeholder={t('sensors.chooseSensor')}
              theme={isDark ? 'DARK' : 'LIGHT'}
              style={{
                borderColor: isDark ? '#292524' : '#a8a29e',
                backgroundColor: isDark ? '#404040' : '#FFFFFF',
                minHeight: 44,
              }}
              dropDownContainerStyle={{
                borderColor: isDark ? '#292524' : '#a8a29e',
                backgroundColor: isDark ? '#404040' : '#FFFFFF',
              }}
              textStyle={{
                color: isDark ? '#FFFFFF' : '#404040',
              }}
              placeholderStyle={{
                color: '#9ca3af',
              }}
              listItemLabelStyle={{
                color: isDark ? '#FFFFFF' : '#404040',
              }}
            />
          ) : (
            <Input
              value={initialZoneNumber}
              onChangeText={setZoneNumber}
              keyboardType="numeric"
              placeholder={t('sensors.numberHelper')}
              disabled={true}
            />
          )}
          <View className="mt-4">
            <Text className="mb-2 dark:text-white">
              {t('sensors.sensorTitle')}
            </Text>
            <Input
              value={zoneName}
              onChangeText={setZoneName}
              placeholder={t('sensors.sensorTitleHelper')}
            />
          </View>

          <View className="flex-row gap-3 mt-6">
            <View className="w-1/2">
              <Button
                title={t('general.cancel')}
                variant="outline"
                size="md"
                fullWidth
                onPress={onClose}
              />
            </View>

            <View className="w-1/2">
              <Button
                title={
                  mode === 'edit' ? t('general.confirm') : t('general.add')
                }
                variant="primary"
                size="md"
                fullWidth
                onPress={handleSubmit}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddZoneModal;
