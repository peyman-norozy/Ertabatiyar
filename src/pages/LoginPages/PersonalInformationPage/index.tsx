import React, { useEffect, useState } from 'react';
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
import { registerHandler } from 'react-native-gesture-handler/lib/typescript/handlers/handlersRegistry';
import { getStorage, setStorage } from '@/utils/storage';
import { useSms } from '@/hook/useSms';
import { formatIranPhoneNumber } from '@/utils/formatIranPhoneNumber';
import { useAuth } from '@/context/AuthContext';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { sendSms, setAllowedNumber, lastSms, loading } = useSms();
  const { login } = useAuth();

  console.log(loading, devicePhoneNumber, 'sdfjueueuggg');
  useEffect(() => {
    (async () => {
      const device = await getStorage('devicePhoneNumber');
      device ? setDevicePhoneNumber(device) : null;
    })();
  }, []);

  const forgotPassword = () => {};
  const registerHandler = () => {
    navigation.navigate('RegisterStep1');
  };

  const registerButtonHandler = async () => {
    await setStorage('userPhoneNumber', userPhoneNumber);
    await setStorage('password', password);
    console.log(devicePhoneNumber, 'asdfjueueufff');
    if (!devicePhoneNumber) {
      Alert.alert('✅', t('personalInformation.warning.text5' as any));
      return;
    }
    setAllowedNumber(devicePhoneNumber)
      .then((msg: string) => {
        console.log(
          devicePhoneNumber,
          `${password} GETALL`,
          'jsdjfuuuyytytytytyy',
        );
        sendSms(
          devicePhoneNumber,
          `${password} GETALL`,
          'CALL:OFF',
          ['access_denied'],
          login,
        );
      })
      .catch((err: any) => {
        Alert.alert('❌ خطا', err.message);
      })
      .finally(() => {
        // setUserPhoneNumber('');
        // setPassword('');
      });
  };

  console.log(lastSms?.body, 'sdfjueueueuggg');

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
                    'personalInformation.input.userPhoneNumber.title' as any,
                  )}
                  placeholder={t(
                    'personalInformation.input.userPhoneNumber.placeHolder' as any,
                  )}
                  keyboardType="numeric"
                  maxLength={11}
                  value={userPhoneNumber}
                  onChangeText={e => {
                    setUserPhoneNumber(e);
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
                  value={password}
                  onChangeText={e => {
                    setPassword(e);
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
            disabled={!(userPhoneNumber.length >= 11 && password.length > 2)}
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
