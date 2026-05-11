import { Modal, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { Trash } from '@/shared/assets/icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const SensorsModeModal = ({
  visible,
  onClose,
  onConfirm,
  disabled,
  loading,
}: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        <View className="bg-white rounded-3xl w-full p-5">
        

          <Text
            font="font-yekan-medium"
            className="text-md text-center text-[#616161]"
          >با تغییر حالت حسگرها همه وضعیت حسگرها تغییر میکند</Text>
          <Text
            font="font-yekan-semibold"
            className="text-center text-[#020202] mt-3"
          >
            آیا مطمئن هستید؟
          </Text>
          <View className="flex-row gap-3 mt-6">
            <View className="flex-1">
              <Button
                title="انصراف"
                variant="outline"
                size="md"
                fullWidth
                disabled={disabled}
                onPress={onClose}
              />
            </View>
            <View className="flex-1">
              <Button
                title="تایید"
                variant="primary"
                size="md"
                fullWidth
                loading={loading}
                onPress={onConfirm}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SensorsModeModal;
