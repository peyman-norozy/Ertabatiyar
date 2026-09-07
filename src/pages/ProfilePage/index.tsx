import { Image, ScrollView, StatusBar, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import {
  antennaVeryWeak,
  antennaWeak,
  antennaGood,
  antennaVeryGood,
} from '@/shared/assets/images';
import { useSms } from '@/context/SmsContext';
import { getStorage, setStorage } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useEffect, useState } from 'react';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { sendSms, loading } = useSms();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [newSimAnten, setNewSimAnten] = useState('0');

  useEffect(() => {
    (async () => {
      const simAnten = (await getStorage('simAnten')) || '0';
      setNewSimAnten(simAnten);
    })();
  }, []);

  const getAntennaStatus = (antenna: string) => {
    const percentage = Number.parseInt(antenna.replace('%', '').trim(), 10);

    if (percentage <= 25) {
      return {
        image: antennaVeryWeak,
        title: t('general.veryWeak' as any),
      };
    }

    if (percentage <= 50) {
      return {
        image: antennaWeak,
        title: t('general.weak' as any),
      };
    }

    if (percentage <= 75) {
      return {
        image: antennaGood,
        title: t('general.good' as any),
      };
    }

    return {
      image: antennaVeryGood,
      title: t('general.veryGood' as any),
    };
  };

  const antennaStatus = getAntennaStatus(newSimAnten);

  const selectSubmitHandler = async () => {
    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) || '';

    const password = (await getStorage('password')) || '';

    try {
      const sms = await sendSms(devicePhoneNumber, `${password} SIG`, `RSSI:`, [
        'USSD_TIMEOUT',
        'SETADMIN',
      ]);

      if (sms.body.includes('RSSI:')) {
        const antenna = sms.body.split(':')[2]?.trim() || '0';

        await setStorage('simAnten', antenna);

        setNewSimAnten(antenna);
      }
    } catch (e) {
      if (e === 'SETADMIN') {
        logout();
      } else if (e === 'USSD_TIMEOUT') {
        showToast(t('general.ussdTimeout'), 'error');
      }
    }
  };

  return (
    <View className="flex-1 bg-[#F9F9F9] dark:bg-neutral-800">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView>
        <View className="flex items-center gap-2 mt-40">
          <Image
            source={antennaStatus.image}
            className="w-[144px] h-[119px]"
            resizeMode="contain"
          />

          <Text
            className="
              text-[#616161]
              dark:text-white
              font-yekan-medium
              text-sm
              mt-7
            "
          >
            {antennaStatus.title}
          </Text>

          <View className="flex-row items-center mt-3 gap-2">
            <Text
              className="
                text-[#424242]
                dark:text-white
                font-yekan-bold
                text-sm
              "
            >
              {t('general.antennaPower' as any)}
            </Text>

            <Text
              className="
                text-[#424242]
                dark:text-white
                font-yekan-bold
                text-sm
              "
            >
              {newSimAnten}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        className="
          absolute
          bottom-0
          left-0
          right-0
          px-6
          py-6
          bg-white
          dark:bg-black
          border
          border-[#EFEFEF]
          dark:border-neutral-800
          rounded-t-2xl
        "
      >
        <Button
          title={t('general.antennaPlacement' as any)}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={selectSubmitHandler}
        />
      </View>
    </View>
  );
};

export default ProfilePage;
