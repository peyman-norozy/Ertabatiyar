import { Image, StatusBar, View } from 'react-native';
import { Button, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { simCard } from '@/shared/assets/images';
import { useSms } from '@/hook/useSms';
import { getStorage, setStorage } from '@/utils/storage';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { useColorScheme } from 'nativewind';

const NotificationPage = () => {
  const { t } = useTranslation();
  const { sendSms, loading } = useSms();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const { colorScheme } = useColorScheme();

  const isDark = colorScheme === 'dark';

  const [newSimPrice, setNewSimPrice] = useState('0');

  const [open, setOpen] = useState(false);
  const [selectedOperator, setSelectedOperator] = useState<string | null>(null);

  console.log(selectedOperator, 'selectedOperator');

  const [items, setItems] = useState([
    {
      label: 'همراه اول',
      value: 'ANT_M',
    },
    {
      label: 'ایرانسل',
      value: 'ANT_I',
    },
  ]);

  useEffect(() => {
    (async () => {
      const simCost = (await getStorage('simPrice')) || '0';
      setNewSimPrice(simCost);
    })();
  }, []);

  const selectSubmitHandler = async () => {
    if (!selectedOperator) return;

    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) || '';

    const password = (await getStorage('password')) || '';

    try {
      const sms = await sendSms(
        devicePhoneNumber,
        `${password} ${selectedOperator}`,
        `BAL:`,
        ['USSD_TIMEOUT', 'SETADMIN'],
      );

      if (sms.body.includes('BAL:')) {
        const price = sms.body.split(':')[1];

        await setStorage('simPrice', price);
        setNewSimPrice(price);
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

      <View className="flex-1 items-center gap-2 mt-40">
        <Image source={simCard} className="w-[144px] h-[119px]" />

        <Text className="text-[#616161] dark:text-white font-yekan-medium text-sm mt-7">
          {t('general.simTitle')}
        </Text>

        <View className="flex-row items-center mt-3 gap-2">
          <Text className="text-[#424242] dark:text-white font-yekan-bold text-sm">
            {t('general.simPrice')}
          </Text>

          <Text className="text-[#424242] dark:text-white font-yekan-bold text-sm">
            {Number(newSimPrice).toLocaleString()}
          </Text>
        </View>

        <View
          className="w-full px-6 mt-5"
          style={{
            zIndex: 1000,
          }}
        >
          <DropDownPicker
            open={open}
            value={selectedOperator}
            setOpen={setOpen}
            setValue={setSelectedOperator}
            items={items}
            setItems={setItems}
            placeholder="اپراتور را انتخاب کنید"
            theme={isDark ? 'DARK' : 'LIGHT'}
            style={{
              borderColor: isDark ? '#292524' : '#a8a29e',
              backgroundColor: isDark ? '#404040' : '#FFFFFF',
              minHeight: 44,
            }}
            dropDownContainerStyle={{
              borderColor: isDark ? '#292524' : '#a8a29e',
              backgroundColor: isDark ? '#404040' : '#FFFFFF',
            }}
            textStyle={{
              color: isDark ? '#FFFFFF' : '#404040',
              fontFamily: 'IRANYekanXFaNum-Medium',
            }}
            placeholderStyle={{
              color: '#9ca3af',
              fontFamily: 'IRANYekanXFaNum-Regular',
            }}
            listItemLabelStyle={{
              color: isDark ? '#FFFFFF' : '#404040',
              fontFamily: 'IRANYekanXFaNum-Medium',
            }}
          />
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] dark:border-neutral-800 rounded-t-2xl">
        <Button
          title={t('general.simUpdate' as any)}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={!selectedOperator || loading}
          onPress={selectSubmitHandler}
        />
      </View>
    </View>
  );
};

export default NotificationPage;
