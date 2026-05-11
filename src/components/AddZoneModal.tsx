import React, { useEffect, useState } from 'react';
import { Modal, View, TouchableOpacity, TextInput } from 'react-native';
import { Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useZonesContext } from '@/context/ZonesContext';
import { getStorage, setStorage } from '@/utils/storage';
import type { AddedZone } from './Sensors';
import { Edit } from '@/shared/assets/icons';

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
  const { updateZone } = useZonesContext();

  const [zoneNumber, setZoneNumber] = useState('');
  const [zoneName, setZoneName] = useState('');

  useEffect(() => {
    if (mode === 'edit' && selectedZone) {
      setZoneNumber(selectedZone.key.replace('Z', ''));

      setZoneName(selectedZone.title);
    }
  }, [mode, selectedZone]);

  const handleSubmit = async () => {
    if (!zoneNumber || !zoneName) return;

    const savedZones = await getStorage('addedZones');

    const parsedZones = savedZones ? JSON.parse(savedZones) : [];

    // EDIT MODE
    if (mode === 'edit' && selectedZone) {
      const updatedZones = parsedZones.map((zone: any) => {
        if (zone.key === selectedZone.key) {
          return {
            ...zone,
            title: zoneName,
          };
        }

        return zone;
      });

      await setStorage('addedZones', JSON.stringify(updatedZones));

      onZoneAdded();

      onClose();

      return;
    }

    // ADD MODE
    const zoneKey = `Z${zoneNumber}`;

    const exists = parsedZones.some((zone: any) => zone.key === zoneKey);

    if (exists) return;

    console.log(zoneKey, zoneName, 'ajjajashhshdgdgffff');

    const updatedZones = [
      ...parsedZones,
      {
        key: zoneKey,
        title: zoneName,
      },
    ];

    console.log(updatedZones, 'jdjdjdjdjytytururu');

    await setStorage('addedZones', JSON.stringify(updatedZones));

    onZoneAdded();

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 justify-center items-center px-5">
        <View className="bg-white w-full rounded-3xl p-5">
          <View>
            <Edit stroke="#3B82F6" />{' '}
          </View>

          <Text className="mb-2">شماره Zone</Text>

          <TextInput
            value={zoneNumber}
            onChangeText={setZoneNumber}
            keyboardType="numeric"
            placeholder="مثلا 5"
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
          />

          <Text className="mb-2">اسم Zone</Text>

          <TextInput
            value={zoneName}
            onChangeText={setZoneName}
            placeholder="مثلا سنسور موتور"
            className="border border-gray-300 rounded-xl px-4 py-3 mb-5"
          />

          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-200 rounded-xl px-5 py-3"
            >
              <Text>لغو</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-blue-500 rounded-xl px-5 py-3"
            >
              <Text className="text-white">فعال‌سازی</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddZoneModal;
