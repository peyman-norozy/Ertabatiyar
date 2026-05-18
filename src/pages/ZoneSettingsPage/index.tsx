import {
  View,
  ScrollView,
  StatusBar,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { Button, SelectCardList, Text } from '@/shared/ui';
import { Edit, Trash } from '@/shared/assets/icons';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardOption } from '@/shared/ui/SelectCardList/SelectCardList';
import EditTitleModal from './titleEditModal';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootDrawerParamList } from '@/shared/ui/header/model';
import { useZonesContext } from '@/context/ZonesContext';
import { useSms } from '@/hook/useSms';
import { getStorage, setStorage } from '@/utils/storage';
import { ZoneKeyType } from '@/types/zone';
import DeleteZoneModal from '@/components/DeleteZoneModal';
import { AppNavigation } from '@/helpers/appNavigation';
import AddZoneModal from '@/components/AddZoneModal';
import { useZoneModalContext } from '@/context/ZoneModalContext';
import AlarmSetting from '@/components/AlarmSetting';
import { useAuth } from '@/context/AuthContext';

type RouteType = RouteProp<RootDrawerParamList, 'ZoneSettingsPage'>;

const ZoneSettingsPage = () => {
  const { t } = useTranslation();
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const route = useRoute<RouteType>();
  const { zoneId } = route.params;
  const [selected, setSelected] = useState('');

  const { sendSms, loading } = useSms();

  const {
    system,
    zones,
    output,
    updateZone,
    updateOutput,
    updateSystem,
    addedZones,
    loadAddedZones,
  } = useZonesContext();

  const [selectedOutput, setSelectedOutput] = useState(
    output?.[zoneId] ?? 'NON',
  );

  useEffect(() => {
    setSelectedOutput(output?.[zoneId] ?? 'NON');
  }, [output, zoneId]);

  console.log(system, zones, 'jadsfjueueyytytyttyty');
  const {
    modalVisible,
    selectedZone,
    mode,
    openAddModal,
    openEditModal,
    closeModal,
  } = useZoneModalContext();

  const navigation = useNavigation<AppNavigation>();
  const { logout } = useAuth();

  const [enterDelay, setEnterDelay] = useState('0');

  const [exitDelay, setExitDelay] = useState('0');

  useEffect(() => {
    setEnterDelay(system?.[zoneId]?.E?.replace('s', '') || '0');

    setExitDelay(system?.[zoneId]?.X?.replace('s', '') || '0');
  }, [system, zoneId]);

  useEffect(() => {
    (async () => {
      const device = await getStorage('devicePhoneNumber');
      const password = await getStorage('password');
      device ? setDevicePhoneNumber(device) : null;
      password ? setPassword(password) : null;
    })();
  }, []);

  console.log(
    enterDelay,
    exitDelay,
    selectedOutput,
    'sdjfueueugfgfgeeeeeefgfgf',
  );

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

    const alarmValue: Record<string, string> = {
      NON: 'NONE',
      SPK: 'SPEAKER',
      SRN: 'SIREN',
      BTH: 'BOTH',
    };

    try {
      const zoneCommand =
        selected === 'OFF'
          ? 'OFF'
          : `${zoneValue[selected]},${alarmValue[selectedOutput]}${
              selected === 'D' ? `,E:${enterDelay},X:${exitDelay}` : ''
            }`;

      const sms = await sendSms(
        devicePhoneNumber,
        `${password} ${zoneKey[zoneId]}=${zoneCommand}`,
        `Zone_${zoneId.split('')[1]}_set`,
        ['access_denied', 'SETADMIN'],
      );

      if (sms.body === `Zone_${zoneId.split('')[1]}_set`) {
        await updateZone(
          zoneId as ZoneKeyType,
          selected === 'OFF' ? 'OFF' : selected,
        );

        await updateOutput(zoneId, selectedOutput);

        if (selected === 'D') {
          await updateSystem(zoneId, 'E', `${enterDelay}`);

          await updateSystem(zoneId, 'X', `${exitDelay}`);
        }
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  console.log(zoneId, 'sjfeueugfgftrt');

  const deleteZone = async () => {
    const saved = await getStorage('addedZones');

    const parsed = saved ? JSON.parse(saved) : [];

    const updated = parsed.filter((z: any) => z.key !== zoneId);

    await setStorage('addedZones', JSON.stringify(updated));

    await loadAddedZones();
  };

  const newTitle = addedZones.find(item => item.key === zoneId)?.title;

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View className="flex-col justify-between items-start gap-3 p-4 rounded-2xl mb-4 border-2 bg-white border-gray-200 mx-4 mt-20">
        <View className="flex-row justify-between w-full">
          <Text font={'font-yekan-bold'}>{newTitle}</Text>
          <Pressable onPress={() => setDeleteModalVisible(true)}>
            <Trash />
          </Pressable>
        </View>
        <TouchableOpacity
          onPress={() =>
            openEditModal({
              key: zoneId,
              title: newTitle ? newTitle : '',
            })
          }
        >
          <View className="flex-row items-center gap-1">
            <Edit width={16} height={16} />
            <Text
              font={'font-yekan-medium'}
              className="text-gray-500 text-xs mt-1"
            >
              {t('zoneSettingsPage.title.description' as any)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        className="bg-[#F9F9F9]"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-col justify-between items-start gap-3 p-4 rounded-2xl mb-4 border-2 bg-white border-gray-200 mx-4">
          <AlarmSetting
            zoneId={zoneId}
            value={selectedOutput}
            onChange={setSelectedOutput}
          />
        </View>
        <View className="flex-1 mx-4 mb-20">
          <SelectCardList
            options={options}
            value={selected}
            onChange={value => selectChangeHandler(value)}
            enterDelay={enterDelay}
            exitDelay={exitDelay}
            setEnterDelay={setEnterDelay}
            setExitDelay={setExitDelay}
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
      <AddZoneModal
        visible={modalVisible}
        onClose={closeModal}
        mode={mode}
        selectedZone={selectedZone}
        onZoneAdded={async () => {
          await loadAddedZones();
        }}
      />
      {/* <EditTitleModal
        visible={modalVisible}
        title={title}
        onClose={() => setModalVisible(false)}
        onChange={newTitle => setTitle(newTitle)}
      /> */}
      <DeleteZoneModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={async () => {
          await deleteZone();
          setDeleteModalVisible(false);
          navigation.goBack();
        }}
        title={newTitle ? newTitle : ''}
      />
    </View>
  );
};

export default ZoneSettingsPage;
