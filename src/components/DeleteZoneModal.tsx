import React from 'react';
import { Modal, Pressable, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { Trash } from '@/shared/assets/icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

const DeleteZoneModal = ({ visible, onClose, onConfirm, title }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        <View className="bg-white rounded-3xl w-full p-5">
          <View className="flex items-center justify-center mb-5">
            <View className="bg-[#ffeded] rounded-full p-3">
              <Trash width={38} height={40} />
            </View>
          </View>

          <Text
            font="font-yekan-medium"
            className="text-sm text-center text-[#616161]"
          >
            حسگر <Text font="font-yekan-bold">"{title}"</Text> حذف خواهد شد
          </Text>
          <Text
            font="font-yekan-semibold"
            className="text-center text-[#020202] mt-3"
          >
            آیا مطمئن هستید؟
          </Text>
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
                title="حذف"
                variant="danger"
                size="md"
                fullWidth
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteZoneModal;
