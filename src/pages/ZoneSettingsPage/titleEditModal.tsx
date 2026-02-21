import { useState } from 'react';
import { Button } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { View, Text, Modal, TextInput } from 'react-native';

type EditTitleModalProps = {
  visible: boolean;
  title: string;
  onClose: () => void;
  onChange: (_newTitle: string) => void;
};

export default function EditTitleModal({
  visible,
  title,
  onClose,
  onChange,
}: EditTitleModalProps) {
  const { t } = useTranslation();
  const [tempTitle, setTempTitle] = useState(title);

  const handleOpen = () => {
    setTempTitle(title);
  };

  const handleConfirm = () => {
    onChange(tempTitle);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onShow={handleOpen}
    >
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white w-80 p-5 rounded-2xl">
          <Text className="text-base mb-3">
            {t('zoneSettingsPage.title.edit')}
          </Text>

          <TextInput
            value={tempTitle}
            onChangeText={setTempTitle}
            className="border border-gray-300 rounded-xl p-3 mb-4"
            placeholder={t('zoneSettingsPage.title.placeholder')}
          />

          <View className="flex-row justify-end gap-2">
            <Button
              title={t('zoneSettingsPage.button.cancel')}
              variant="danger"
              size="sm"
              onPress={onClose}
            />
            <Button
              title={t('zoneSettingsPage.button.confirm')}
              variant="primary"
              size="sm"
              onPress={handleConfirm}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
