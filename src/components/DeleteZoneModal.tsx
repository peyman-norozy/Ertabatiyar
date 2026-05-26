import { Modal, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { Trash } from '@/shared/assets/icons';
import { useTranslation } from 'react-i18next';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
};

const DeleteZoneModal = ({ visible, onClose, onConfirm, title }: Props) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} backdropColor="#000000a3"  animationType="fade">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-white dark:bg-neutral-900 rounded-3xl w-full p-5">
          <View className="flex items-center justify-center mb-5">
            <View className="bg-[#ffeded] rounded-full p-3">
              <Trash width={38} height={40} />
            </View>
          </View>

          <Text
            font="font-yekan-medium"
            className="text-sm text-center text-[#616161] dark:text-white"
          >
            {t('general.sensor')} <Text font="font-yekan-bold">"{title}"</Text>{' '}
            {t('general.willBeDeleted')}.
          </Text>
          <Text
            font="font-yekan-semibold"
            className="text-center text-[#020202]  dark:text-white mt-3"
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
                onPress={onClose}
              />
            </View>
            <View className="flex-1">
              <Button
                title={t('general.delete')}
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
