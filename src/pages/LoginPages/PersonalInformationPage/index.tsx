import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { logoBlue } from '@/shared/assets/images';
import { Input, Button, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { setStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import { useAuth } from '@/context/AuthContext';
import { useIsLogin } from '@/hook/useIsLogin';
import { useEffect, useState } from 'react';
import { parseDeviceSms } from '@/utils/parseDeviceSms';
import { useToast } from '@/context/ToastContext';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const { showToast } = useToast();

  const { sendSms, setAllowedNumber, loading, lastSms } = useSms();
  const { login, isLoggedIn } = useAuth();
  const { devicePhoneNumber, setIsLogin, isLogin } = useIsLogin();

  const [newDevicePhoneNumber, setNewDevicePhoneNumber] = useState('');
  const [newUserPhoneNumber, setNewUserPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const forgotPassword = () => {};
  const registerHandler = () => {
    navigation.navigate('RegisterStep1');
  };

  useEffect(() => {
    if (devicePhoneNumber) {
      setIsLogin(pre => !pre);
    }
  }, [devicePhoneNumber]);

  const registerButtonHandler = async () => {
    setAllowedNumber(newDevicePhoneNumber)
      .then(async (msg: string) => {
        const getLastsms = await sendSms(
          newDevicePhoneNumber,
          `${newPassword} GETALL`,
          'CALL:',
          ['access_denied', 'SETADMIN'],
          login,
          async () => {
            await setStorage('userPhoneNumber', newUserPhoneNumber);
            await setStorage('devicePhoneNumber', newDevicePhoneNumber);
            await setStorage('password', newPassword);
          },
        );
        const parsedData = parseDeviceSms(getLastsms.body);
        await setStorage('deviceZones', JSON.stringify(parsedData));
      })
      .catch((err: any) => {
        if (err === 'SETADMIN') {
          showToast('لطفا ثبت نام کنید!!', 'error');
        }
      });
  };

  console.log(isLoggedIn, lastSms, 'asdjfuuzxzxzxeu');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        className="flex-1 bg-white dark:bg-neutral-800"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 mx-4">
          <View className="flex-1 items-center mt-[48px] px-6">
            <View>
              <Image source={logoBlue} className="w-[110px] h-[110px]" />
            </View>
            <View className="mt-[40px] w-full">
              <View className="w-full mt-1">
                <Input
                  label={t(
                    'personalInformation.input.devicePhoneNumber.title' as any,
                  )}
                  placeholder={t(
                    'personalInformation.input.devicePhoneNumber.placeHolder' as any,
                  )}
                  keyboardType="numeric"
                  maxLength={11}
                  value={newDevicePhoneNumber}
                  onChangeText={e => {
                    setNewDevicePhoneNumber(e);
                  }}
                />
              </View>
              <View className="w-full mt-6">
                <Input
                  label={t(
                    'personalInformation.input.userPhoneNumber.title' as any,
                  )}
                  placeholder={t(
                    'personalInformation.input.userPhoneNumber.placeHolder' as any,
                  )}
                  keyboardType="numeric"
                  maxLength={11}
                  value={newUserPhoneNumber}
                  onChangeText={e => {
                    setNewUserPhoneNumber(e);
                  }}
                />
              </View>
              <View className="w-full mt-4">
                <Input
                  label={t('personalInformation.input.password.title' as any)}
                  placeholder={t(
                    'personalInformation.input.password.placeHolder' as any,
                  )}
                  type={'password'}
                  value={newPassword}
                  onChangeText={e => {
                    setNewPassword(e);
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={forgotPassword}
              className="mt-4 self-end"
              activeOpacity={0.7}
            >
              <Text className="text-[#1890FF]" font={'font-yekan-medium'}>
                {t('personalInformation.forgotPassword' as any)}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            className={'flex-row items-center justify-center gap-1 mb-8 mt-10'}
          >
            <Text
              className={'text-base dark:text-white'}
              font={'font-yekan-medium'}
            >
              {t('personalInformation.newNumber' as any)}
            </Text>
            <TouchableOpacity onPress={registerHandler} activeOpacity={0.7}>
              <Text className="text-[#1890FF]" font={'font-yekan-medium'}>
                {t('personalInformation.submit' as any)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View className="px-6 py-4 bg-white dark:bg-neutral-800 border-t border-neutral-200">
        <Button
          title={t('personalInformation.input.button.title' as any)}
          variant="primary"
          size="lg"
          disabled={
            !(
              newDevicePhoneNumber?.length >= 11 &&
              newUserPhoneNumber?.length >= 11 &&
              newPassword?.length > 2
            )
          }
          loading={loading}
          fullWidth
          onPress={registerButtonHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationPage;
