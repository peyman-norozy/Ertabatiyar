import { View, ScrollView, StatusBar, Pressable } from 'react-native';
import { Button, SelectCardList, Text } from '@/shared/ui';
import { Edit } from '@/shared/assets/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardOption } from '@/shared/ui/SelectCardList/SelectCardList';
import EditTitleModal from './titleEditModal';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootDrawerParamList } from '@/shared/ui/header/model';
import { useZonesContext } from '@/context/ZonesContext';
import { useSms } from '@/hook/useSms';
import { getStorage } from '@/utils/storage';
import { ZoneKeyType } from '@/types/zone';

type RouteType = RouteProp<RootDrawerParamList, 'ZoneSettingsPage'>;

const ZoneSettingsPage = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('عنوان');
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { zones, updateZone } = useZonesContext();
  const route = useRoute<RouteType>();
  const { zoneId } = route.params;
  const [selected, setSelected] = useState('');

  const { sendSms, loading } = useSms();

  useEffect(() => {
    (async () => {
      const device = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');
      device ? setDevicePhoneNumber(device) : null;
      password ? setPassword(password) : null;
    })();
  }, []);

  console.log(zones, 'sdjfueueugfgfgfgfgf');

  const options: CardOption[] = [
    {
      label: t('zoneSettingsPage.status.off' as any),
      value: 'OFF',
      description: t('zoneSettingsPage.status.offDescription' as any),
      disabled: loading,
    },
    {
      label: t('zoneSettingsPage.status.normal' as any),
      value: 'N',
      description: t('zoneSettingsPage.status.normalDescription' as any),
      disabled: loading,
    },
    {
      label: t('zoneSettingsPage.status.withDelay' as any),
      value: 'D',
      description: t('zoneSettingsPage.status.withDelayDescription' as any),
      disabled: loading,
    },
    {
      label: t('zoneSettingsPage.status.twentyFourHours' as any),
      value: '24H',
      description: t(
        'zoneSettingsPage.status.twentyFourHoursDescription' as any,
      ),
      disabled: loading,
    },
    {
      label: t('zoneSettingsPage.status.silent' as any),
      value: 'I',
      description: t('zoneSettingsPage.status.silentDescription' as any),
      disabled: loading,
    },
    {
      label: t('zoneSettingsPage.status.warning' as any),
      value: 'F',
      description: t('zoneSettingsPage.status.warningDescription' as any),
      disabled: loading,
    },
  ];

  useEffect(() => {
    if (zones[zoneId]) {
      setSelected(zones[zoneId]);
    }
  }, [zones, zoneId]);
  console.log(zones[zoneId], 'sdjfueueuu');

  const selectChangeHandler = async (val: string) => {
    setSelected(val);
  };

  const selectSubmitHandler = async () => {
    const zoneKey: Record<ZoneKeyType, string> = {
      Z1: 'ZONE1',
      Z2: 'ZONE2',
      Z3: 'ZONE3',
      Z4: 'ZONE4',
      Z5: 'ZONE5',
    };
    const zoneValue: Record<string, string> = {
      N: 'NORMAL',
      I: 'INSTANT',
      '24H': '24HOUR',
      D: 'DELAY',
      F: 'FIRE',
    };
    try {
      const sms = await sendSms(
        devicePhoneNumber,
        `${password} ${zoneKey[zoneId]}=${
          selected === 'OFF' ? 'OFF' : zoneValue[selected]
        }`,
        `Zone_${zoneId.split('')[1]}_set`,
        ['access_denied'],
      );

      if (sms.body === `Zone_${zoneId.split('')[1]}_set`) {
        updateZone(
          zoneId as ZoneKeyType,
          selected === 'OFF' ? 'OFF' : selected,
        );
      }
    } catch (e) {
      console.log('SMS failed:', e);
    }
  };

  console.log(zones, selected, 'sdjfueueu');

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
            onChange={value => selectChangeHandler(value)}
          />
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] rounded-t-2xl">
        <Button
          title={t('zoneSettingsPage.button.confirm' as any)}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={selectSubmitHandler}
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
