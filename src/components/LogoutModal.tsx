import React from 'react';
import { Modal, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { Warning } from '@/shared/assets/icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogout: () => void;
};

const LogoutModal: React.FC<Props> = ({ visible, onClose, onLogout }) => {
  const { t } = useTranslation();

  return (
    <Modal visible={visible} backdropColor="#000000a3" animationType="fade">
      <View className="flex-1 justify-center items-center">
        <View className="bg-white dark:bg-neutral-900 w-full rounded-3xl p-5">
          <View className="flex items-center justify-center">
            <Warning width={60} height={60} />
          </View>
          <View>
            <Text className="my-4 text-center font-yekan-semibold dark:text-white">
              {t('general.areYouSureWantExitApp')}
            </Text>
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
                title={t('general.confirm')}
                variant="primary"
                size="md"
                fullWidth
                onPress={onLogout}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
