import { Text, Button } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { ScrollView } from 'react-native-gesture-handler';
import { logoBlue } from '@/shared/assets/images';
import { RotateRight } from '@/shared/assets/icons';
import { getStorage, setStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { formatIranPhoneNumber } from '@/utils/formatIranPhoneNumber';

const CELL_COUNT = 4;
const RESEND_TIME = 120;

const OtpRegister = () => {
  const { t } = useTranslation();
  const { sendSms, setAllowedNumber, loading } = useSms();
  const navigation = useNavigation<any>();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [value, setValue] = useState('');
  const [timer, setTimer] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');

  useEffect(() => {
    (async () => {
      const device = (await getStorage('devicePhoneNumber')) || '';
      setDevicePhoneNumber(device);
      console.log(device, 'ajsdfjueueueuu');
    })();
  }, []);

  const ref = useBlurOnFulfill({
    value,
    cellCount: CELL_COUNT,
  });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleResendCode = async () => {
    if (!canResend) return;
    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) || '';
    const userPhoneNumber = (await getStorage('userPhoneNumber')) || '';
    // TODO: resend OTP API call
    console.log('Resend OTP');
    setAllowedNumber(devicePhoneNumber)
      .then(async () => {
        const sms = await sendSms(
          devicePhoneNumber,
          `SETADMIN=0,${formatIranPhoneNumber(userPhoneNumber)}`,
          'code:',
          ['wrong_password!', 'SETADMIN'],
          () => {},
          async () => {},
        );
        if (sms.body.includes('code:')) {
          setTimer(RESEND_TIME);
          setCanResend(false);
          setValue('');
        }
      })
      .catch(e => {
        console.log(e, 'djfjsdfjueuehfhfgg');
        if (e === 'SETADMIN') {
        }
      });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <ScrollView
        className="flex-1 bg-white dark:bg-neutral-800"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingBottom: 120,
        }}
      >
        <View className="flex-1 mx-4">
          <View className="flex-1 items-center mt-[48px] px-6">
            <Image source={logoBlue} className="w-[110px] h-[110px]" />

            <View className="mt-14 gap-4">
              <Text className="text-[#020202] text-sm font-yekan-medium">
                کد تایید را وارد کنید
              </Text>

              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                rootStyle={{
                  gap: 30,
                  direction: 'ltr',
                }}
                renderCell={({ index, symbol, isFocused }) => (
                  <View
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                    className={`w-16 h-16 rounded-md border items-center justify-center ${
                      isFocused ? 'border-blue-500' : 'border-[#A2A2A2]'
                    }`}
                  >
                    <Text className="text-2xl font-bold">
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>

            <View className="flex-row justify-between w-full mt-6 gap-4">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('RegisterStep1');
                }}
              >
                <Text className="text-[#1A73E8] font-yekan-medium text-xs">
                  ویرایش شماره همراه
                </Text>
              </TouchableOpacity>

              {canResend ? (
                <TouchableOpacity onPress={handleResendCode} disabled={loading}>
                  <View className="flex-row items-center gap-1">
                    <Text className="text-[#1890FF] font-yekan-medium text-xs">
                      ارسال مجدد کد
                    </Text>
                    <RotateRight width={16} height={16} />
                  </View>
                </TouchableOpacity>
              ) : (
                <Text className="text-[#777777] font-yekan-medium text-sm">
                  {formatTime(timer)} مانده تا دریافت مجدد کد
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          padding: 16,
          backgroundColor: 'white',
        }}
        className="dark:bg-neutral-800 border-t border-neutral-200"
      >
        <Button
          title={t('personalInformation.input.button.title' as any)}
          variant="primary"
          size="lg"
          fullWidth
          disabled={value.length !== CELL_COUNT}
          loading={loading}
          onPress={() => {
            setAllowedNumber(devicePhoneNumber)
              .then(async () => {
                const sms = await sendSms(
                  devicePhoneNumber,
                  `VERIFYADMIN=${value}`,
                  'admin_registration_completed.',
                  [
                    'invalid_verification_code.',
                    'SETADMIN',
                    'verification_timeout.',
                  ],
                  () => {
                    // navigation.navigate('LoginStep1');
                  },
                  async () => {
                    // await setStorage('userPhoneNumber', userPhoneNumber);
                    // await setStorage('devicePhoneNumber', devicePhoneNumber);
                  },
                );

                console.log(sms, 'jfjfjfjytytytyaaa');
                if (sms.body === 'admin_registration_completed.') {
                  console.log('sdjfsjdfpeymannorozy');
                  await setStorage('otp', 'true');
                  navigation.navigate('LoginStep1');
                }
                console.log(sms, 'skjfurruhfhghth');
              })
              .catch(e => {
                if (e === 'invalid_verification_code.') {
                  showToast('کد اشتباه وارد شده است', 'error');
                } else if (e === 'verification_timeout.' || e === 'SETADMIN') {
                  showToast(
                    'زمان ارسال کد به پایان رسید لطفا مجدد کد دریافت کنید',
                    'error',
                  );
                }
              });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpRegister;
