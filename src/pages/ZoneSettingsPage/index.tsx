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
import { useThemeMode } from '@/hook/useThemeMode';

type RouteType = RouteProp<RootDrawerParamList, 'ZoneSettingsPage'>;

const ZoneSettingsPage = () => {
  const { t } = useTranslation();
  const { isDark } = useThemeMode();

  const route = useRoute<RouteType>();
  const { zoneId } = route.params;

  const navigation = useNavigation<AppNavigation>();

  const { sendSms, loading } = useSms();
  const { logout } = useAuth();

  const {
    zones,
    addedZones,
    updateZone,
    updateOutput,
    updateSystem,
    loadAddedZones,
  } = useZonesContext();

  const { modalVisible, selectedZone, mode, openEditModal, closeModal } =
    useZoneModalContext();

  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');

  const [password, setPassword] = useState('');

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [selected, setSelected] = useState('');

  const [selectedOutput, setSelectedOutput] = useState<'R' | 'P' | 'B' | 'N'>(
    'N',
  );

  const [enterDelay, setEnterDelay] = useState('0');

  const [exitDelay, setExitDelay] = useState('0');

  // =====================================================
  // Load Device Credentials
  // =====================================================

  useEffect(() => {
    const loadCredentials = async () => {
      const device = await getStorage('devicePhoneNumber');

      const savedPassword = await getStorage('password');

      if (device) {
        setDevicePhoneNumber(device);
      }

      if (savedPassword) {
        setPassword(savedPassword);
      }
    };

    loadCredentials();
  }, []);

  // =====================================================
  // Load Zone Data
  // =====================================================

  useEffect(() => {
    const zone = zones[zoneId];

    if (!zone) {
      return;
    }

    setSelected(zone.type);

    setSelectedOutput((zone.output as 'R' | 'P' | 'B' | 'N') || 'N');

    setEnterDelay(zone.enterDelay || '0');

    setExitDelay(zone.exitDelay || '0');
  }, [zones, zoneId]);

  // =====================================================
  // Zone Options
  // =====================================================

  const options: CardOption[] = [
    {
      label: t('zoneSettingsPage.status.off' as any),
      value: 'O',
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
      value: '24',
      description: t(
        'zoneSettingsPage.status.twentyFourHoursDescription' as any,
      ),
      disabled: loading,
    },

    {
      label: t('zoneSettingsPage.status.silent' as any),
      value: 'S',
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

  // =====================================================
  // Select Zone Type
  // =====================================================

  const selectChangeHandler = (value: string) => {
    setSelected(value);
  };

  // =====================================================
  // Submit Zone Settings
  // =====================================================

  const selectSubmitHandler = async () => {
    const zoneKey: Record<ZoneKeyType, string> = {
      Z1: 'ZONE1',
      Z2: 'ZONE2',
      Z3: 'ZONE3',
      Z4: 'ZONE4',
      Z5: 'ZONE5',
    };

    /**
     * UI value -> Device SMS value
     *
     * N   -> NORMAL
     * I   -> INSTANT
     * 24  -> 24HOUR
     * S   -> SILENT
     * F   -> FIRE
     * D   -> DELAY
     * O   -> OFF
     */
    const zoneValue: Record<string, string> = {
      N: 'NORMAL',
      I: 'INSTANT',
      '24': '24HOUR',
      S: 'SILENT',
      F: 'FIRE',
      D: 'DELAY',
    };

    /**
     * UI output -> Device SMS value
     *
     * R -> SIREN
     * P -> SPEAKER
     * B -> BOTH
     * N -> NONE
     */
    const alarmValue: Record<'R' | 'P' | 'B' | 'N', string> = {
      R: 'SIREN',
      P: 'SPEAKER',
      B: 'BOTH',
      N: 'NONE',
    };

    try {
      let zoneCommand = '';

      // ================================================
      // OFF
      // ================================================

      if (selected === 'O') {
        zoneCommand = 'OFF';
      }

      // ================================================
      // NORMAL / INSTANT / 24H / SILENT / FIRE
      // ================================================
      else {
        zoneCommand =
          `${zoneValue[selected]},` + `${alarmValue[selectedOutput]}`;

        // ==============================================
        // DELAY
        // ==============================================

        if (selected === 'D') {
          zoneCommand += `,E=${enterDelay},X=${exitDelay}`;
        }
      }

      const sms = await sendSms(
        devicePhoneNumber,

        `${password} ` +
          `${zoneKey[zoneId as ZoneKeyType]}` +
          `=${zoneCommand}`,

        `Zone_${zoneId[1]}_set`,

        ['access_denied', 'SETADMIN'],
      );

      console.log('Zone settings SMS:', sms.body);

      // ================================================
      // SUCCESS
      // ================================================

      if (sms.body === `Zone_${zoneId[1]}_set`) {
        // ----------------------------------------------
        // Update type
        // ----------------------------------------------

        await updateZone(zoneId, selected);

        // ----------------------------------------------
        // Update output
        // ----------------------------------------------

        await updateOutput(zoneId, selectedOutput);

        // ----------------------------------------------
        // Update delays
        // ----------------------------------------------

        await updateSystem(zoneId, 'E', selected === 'D' ? enterDelay : '0');

        await updateSystem(zoneId, 'X', selected === 'D' ? exitDelay : '0');
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      }
    }
  };

  // =====================================================
  // Delete Zone
  // =====================================================

  const deleteZone = async () => {
    try {
      const saved = await getStorage('addedZones');

      const parsed = saved ? JSON.parse(saved) : [];

      const updated = parsed.filter((zone: any) => zone.key !== zoneId);

      await setStorage('addedZones', JSON.stringify(updated));

      await loadAddedZones();
    } catch (e) {
      console.log('deleteZone error:', e);
    }
  };

  // =====================================================
  // Zone Title
  // =====================================================

  const newTitle = addedZones.find(item => item.key === zoneId)?.title;

  // =====================================================
  // Render
  // =====================================================

  return (
    <View className="flex-1 bg-[#F9F9F9] dark:bg-neutral-800">
      <StatusBar
        backgroundColor="white"
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      {/* ================================================= */}
      {/* Header */}
      {/* ================================================= */}

      <View
        className="
          flex-col justify-between
          items-start gap-3
          p-4 rounded-2xl mb-4
          border-2
          bg-white dark:bg-neutral-900
          border-gray-200 dark:border-neutral-800
          mx-4 mt-20
        "
      >
        <View className="flex-row justify-between w-full">
          <Text className="dark:text-white" font="font-yekan-bold">
            {newTitle}
          </Text>

          <Pressable onPress={() => setDeleteModalVisible(true)}>
            <Trash />
          </Pressable>
        </View>

        <TouchableOpacity
          onPress={() =>
            openEditModal({
              key: zoneId,
              title: newTitle || '',
            })
          }
        >
          <View className="flex-row items-center gap-2">
            <Edit width={16} height={16} stroke={isDark ? '#fff' : '#000'} />

            <Text
              font="font-yekan-medium"
              className="
                text-gray-500
                text-xs mt-1
              "
            >
              {t('zoneSettingsPage.title.description' as any)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ================================================= */}
      {/* Content */}
      {/* ================================================= */}

      <ScrollView
        className="
          bg-[#F9F9F9]
          dark:bg-neutral-800
        "
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 120,
        }}
      >
        {/* ================================================= */}
        {/* Alarm / Speaker */}
        {/* ================================================= */}

        <View
          className="
            flex-col
            justify-between
            items-start
            gap-3
            p-4
            rounded-2xl
            mb-4
            border-2
            bg-white
            dark:bg-neutral-900
            border-gray-200
            dark:border-neutral-800
            mx-4
          "
        >
          <AlarmSetting
            zoneId={zoneId}
            value={selectedOutput}
            onChange={setSelectedOutput}
          />
        </View>

        {/* ================================================= */}
        {/* Zone Type */}
        {/* ================================================= */}

        <View className="flex-1 mx-4 mb-20">
          <SelectCardList
            options={options}
            zoneId={zoneId}
            value={selected}
            onChange={selectChangeHandler}
            enterDelay={enterDelay}
            exitDelay={exitDelay}
            setEnterDelay={setEnterDelay}
            setExitDelay={setExitDelay}
          />
        </View>
      </ScrollView>

      {/* ================================================= */}
      {/* Confirm */}
      {/* ================================================= */}

      <View
        className="
          absolute
          bottom-0
          left-0
          right-0
          px-6
          py-6
          bg-white
          dark:bg-neutral-900
          border
          border-[#EFEFEF]
          dark:border-neutral-800
          rounded-t-2xl
        "
      >
        <Button
          title={t('zoneSettingsPage.button.confirm' as any)}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={selectSubmitHandler}
        />
      </View>

      {/* ================================================= */}
      {/* Edit Zone Modal */}
      {/* ================================================= */}

      <AddZoneModal
        visible={modalVisible}
        onClose={closeModal}
        mode={mode}
        selectedZone={selectedZone}
        onZoneAdded={async () => {
          await loadAddedZones();
        }}
      />

      {/* ================================================= */}
      {/* Delete Zone Modal */}
      {/* ================================================= */}

      <DeleteZoneModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={async () => {
          await deleteZone();

          setDeleteModalVisible(false);

          navigation.goBack();
        }}
        title={newTitle || ''}
      />
    </View>
  );
};

export default ZoneSettingsPage;
