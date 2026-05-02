import { View, ScrollView, StatusBar, Pressable } from 'react-native';
import { Button, SelectCardList, Text } from '@/shared/ui';
import { Edit } from '@/shared/assets/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardOption } from '@/shared/ui/SelectCardList/SelectCardList';
import EditTitleModal from './titleEditModal';

const ZoneSettingsPage = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('عنوان');
  const [selected, setSelected] = useState('');

  const options: CardOption[] = [
    {
      label: t('zoneSettingsPage.status.off' as any),
      value: '1',
      description: t('zoneSettingsPage.status.offDescription' as any),
    },
    {
      label: t('zoneSettingsPage.status.normal' as any),
      value: '2',
      description: t('zoneSettingsPage.status.normalDescription' as any),
    },
    {
      label: t('zoneSettingsPage.status.withDelay' as any),
      value: '3',
      description: t('zoneSettingsPage.status.withDelayDescription' as any),
    },
    {
      label: t('zoneSettingsPage.status.twentyFourHours' as any),
      value: '4',
      description: t(
        'zoneSettingsPage.status.twentyFourHoursDescription' as any,
      ),
    },
    {
      label: t('zoneSettingsPage.status.silent' as any),
      value: '5',
      description: t('zoneSettingsPage.status.silentDescription' as any),
    },
    {
      label: t('zoneSettingsPage.status.warning' as any),
      value: '6',
      description: t('zoneSettingsPage.status.warningDescription' as any),
    },
  ];

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="flex-row justify-between items-start p-4 rounded-2xl mb-4 border-2 bg-white border-gray-200 mx-4 mt-20">
        <View className="flex-col">
          <Text font={'font-yekan-bold'}>{title}</Text>
          <Text
            font={'font-yekan-medium'}
            className="text-gray-500 text-sm mt-1"
          >
            {t('zoneSettingsPage.title.description' as any)}
          </Text>
        </View>

        <Pressable onPress={() => setModalVisible(true)}>
          <Edit />
        </Pressable>
      </View>
      <ScrollView
        className="bg-[#F9F9F9]"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 mx-4 mb-20">
          <SelectCardList
            options={options}
            value={selected}
            onChange={setSelected}
          />
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] rounded-t-2xl">
        <Button
          title={t('zoneSettingsPage.button.confirm' as any)}
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => {}}
        />
      </View>
      <EditTitleModal
        visible={modalVisible}
        title={title}
        onClose={() => setModalVisible(false)}
        onChange={newTitle => setTitle(newTitle)}
      />
    </View>
  );
};

export default ZoneSettingsPage;
