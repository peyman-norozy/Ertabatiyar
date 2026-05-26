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
    <Modal visible={visible} backdropColor="#000000a3"  animationType="fade">
      {/* Overlay */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Card */}
        <View className="w-full rounded-3xl p-5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">

          {/* Message */}
          <Text className="text-sm text-center text-neutral-500 dark:text-neutral-400 font-medium">
            {t('general.messages.sensorsMode')}
          </Text>

          {/* Title */}
          <Text className="text-center text-black dark:text-white mt-3 font-semibold text-base">
            {t('general.areYouSure')}
          </Text>

          {/* Actions */}
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