import React, { useEffect, useState } from 'react';
import { Modal, View } from 'react-native';
import { Button, Input, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useZonesContext } from '@/context/ZonesContext';
import { getStorage, setStorage } from '@/utils/storage';
import { BlueAdd, BlueEdit } from '@/shared/assets/icons';

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
          {mode == 'edit' ? (
            <View className="flex items-center justify-center">
              <View className="bg-[#8CC8FF33] p-4 rounded-full">
                <BlueEdit width={36} height={36} stroke="#1890FF" />
              </View>
            </View>
          ) : (
            <View className="flex items-center justify-center">
              <View className="bg-[#8CC8FF33] p-4 rounded-full">
                <BlueAdd width={38} height={38} stroke="#1890FF" />
              </View>
            </View>
          )}

          <Text className="mb-2">شماره Zone</Text>

          <Input
            value={zoneNumber}
            onChangeText={setZoneNumber}
            keyboardType="numeric"
            placeholder="مثلا 5"
            disabled={mode == 'edit'}
          />

          <Text className="mb-2">اسم Zone</Text>

          <Input
            value={zoneName}
            onChangeText={setZoneName}
            placeholder="مثلا سنسور موتور"
          />

          <View className="flex-row gap-3 mt-6">
            <View className="w-1/2">
              <Button
                title="انصراف"
                variant="outline"
                size="md"
                fullWidth
                onPress={onClose}
              />
            </View>
            <View className="w-1/2">
              <Button
                title={mode == 'edit' ? 'تایید' : 'افزودن'}
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
