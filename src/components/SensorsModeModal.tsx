import { Modal, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40 px-6">
        <View className="bg-white rounded-3xl w-full p-5">
          <Text
            font="font-yekan-medium"
            className="text-md text-center text-[#616161]"
          >
            {t('general.messages.sensorsMode')}
          </Text>
          <Text
            font="font-yekan-semibold"
            className="text-center text-[#020202] mt-3"
          >
            {t('general.areYouSure')}
          </Text>
          <View className="flex-row gap-3 mt-6">
            <View className="flex-1">
              <Button
                title={t('general.cancel')}
                variant="outline"
                size="md"
                fullWidth
                disabled={disabled}
                onPress={onClose}
              />
            </View>
            <View className="flex-1">
              <Button
                title={t('general.confirm')}
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
