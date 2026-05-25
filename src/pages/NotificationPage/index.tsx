import { Image, ScrollView, StatusBar, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import { useTranslation } from 'react-i18next';
import { simCard } from '@/shared/assets/images';
import { useSms } from '@/hook/useSms';
import { getStorage, setStorage } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useEffect, useState } from 'react';

const NotificationPage = () => {
  const { t } = useTranslation();
  const { sendSms, loading } = useSms();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const [newSimPrice, setNewSimPrice] = useState('0');

  useEffect(() => {
    (async () => {
      const simCost = (await getStorage('simPrice')) || '0';
      setNewSimPrice(simCost);
    })();
  }, []);

  const selectSubmitHandler = async () => {
    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) || '';
    const password = (await getStorage('password')) || '';

    try {
      const sms = await sendSms(devicePhoneNumber, `${password} ANT`, `BAL:`, [
        'USSD_TIMEOUT',
        'SETADMIN',
      ]);

      if (sms.body.includes('BAL:')) {
        await setStorage('simPrice', sms.body.split(':')[1]);
        setNewSimPrice(sms.body.split(':')[1]);
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
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView>
        <View className={'flex items-center gap-2 mt-40'}>
          <Image source={simCard} className={'w-[144px] h-[119]'} />

          <Text className={'text-[#616161] font-yekan-medium text-sm mt-7'}>
            {t('general.simTitle')}
          </Text>
          <View className="flex-row items-center mt-3 gap-2">
            <Text className="text-[#424242] font-yekan-bold text-sm ">
              {t('general.simPrice')}
            </Text>
            <Text>{Number(newSimPrice).toLocaleString()}</Text>
          </View>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] rounded-t-2xl">
        <Button
          title={t('general.simUpdate' as any)}
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

export default NotificationPage;
