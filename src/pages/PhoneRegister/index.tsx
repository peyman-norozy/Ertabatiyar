import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
  Alert,
} from 'react-native';

import { logoBlue } from '@/shared/assets/images';
import { Button, Input, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { getStorage, setStorage } from '@/utils/storage';
import { formatIranPhoneNumber } from '@/utils/formatIranPhoneNumber';
import { useSms } from '@/hook/useSms';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const { sendSms, setAllowedNumber, loading } = useSms();
  const { login } = useAuth();

  useEffect(() => {
    (async () => {
      const a = await getStorage('devicePhoneNumber');
      console.log(a, 'ajsdfjueueueuu');
    })();
  }, []);

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
                  value={devicePhoneNumber}
                  onChangeText={e => {
                    setDevicePhoneNumber(e);
                  }}
                />
              </View>
              <View className="w-full mt-4">
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
            </View>
          </View>
          <View
            className={
              'bg-[#F4F6F7] dark:bg-neutral-600 rounded-lg mt-3 py-3 px-2 flex-row gap-2 overflow-hidden'
            }
          >
            <View className={'w-2 bg-[#1659B1] rounded-xl'} />
            <View className={'flex-1'}>
              <Text className="dark:text-white">
                {t('personalInformation.warning.text1' as any)}
              </Text>
              <Text className="dark:text-white">
                {t('personalInformation.warning.text2' as any)}
              </Text>
              <Text className="dark:text-white">
                {t('personalInformation.warning.text3' as any)}
              </Text>
              <Text className="dark:text-white">
                {t('personalInformation.warning.text4' as any)}
              </Text>
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
          loading={loading}
          disabled={
            !(userPhoneNumber.length >= 11 && devicePhoneNumber.length >= 11)
          }
          onPress={async () => {
            await setStorage('devicePhoneNumber', devicePhoneNumber);
            await setStorage('userPhoneNumber', userPhoneNumber);

            setAllowedNumber(devicePhoneNumber)
              .then(() => {
                sendSms(
                  devicePhoneNumber,
                  `SETADMIN=0,${formatIranPhoneNumber(userPhoneNumber)}`,
                  'Admin_number_updated.',
                  ['wrong_password!'],
                  () => {
                    navigation.navigate('LoginStep1');
                  },
                  async () => {
                    await setStorage('userPhoneNumber', userPhoneNumber);
                    await setStorage('devicePhoneNumber', devicePhoneNumber);
                  },
                );
              })
              .catch(err => {
                Alert.alert('❌ خطا', err.message);
              });
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;
