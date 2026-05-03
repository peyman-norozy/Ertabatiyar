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
import SplashScreen from '@/components/SplashScreen.tsx';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const { sendSms, setAllowedNumber, loading } = useSms();
  const { login ,isLoggedIn} = useAuth();
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
    // if (!devicePhoneNumber && !userPhoneNumber) {
    //   Alert.alert('✅', t('personalInformation.warning.text5' as any));
    //   return;
    // }
    console.log(
      newDevicePhoneNumber,
      newPassword,
      newUserPhoneNumber,
      'all_device',
    );

    setAllowedNumber(newDevicePhoneNumber)
      .then((msg: string) => {
        sendSms(
          newDevicePhoneNumber,
          `${newPassword} GETALL`,
          'CALL:OFF',
          ['access_denied', 'SETADMIN'],
          login,
          async () => {
            await setStorage('userPhoneNumber', newUserPhoneNumber);
            await setStorage('devicePhoneNumber', newDevicePhoneNumber);
            await setStorage('password', newPassword);
          },
        );
      })
      .catch((err: any) => {
        Alert.alert('❌ خطا', err.message);
      });
  };

  console.log(isLoggedIn, 'asdjfuuzxzxzxeu');

  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        className="flex-1 bg-white dark:bg-neutral-800"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 mx-4 mt-6 mb-20">
          <View className="flex-1 items-center mt-[48px] px-6">
            <View>
              <Image source={logoBlue} className="w-[124px] h-[117px]" />
            </View>
            <View className="mt-[56px] w-full">
              <View className="w-full mt-6">
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
        <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-neutral-800 ">
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationPage;
