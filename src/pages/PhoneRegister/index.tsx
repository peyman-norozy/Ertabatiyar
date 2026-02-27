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

const Index = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [devicePhoneNumber, setDevicePhoneNumber] = useState('');
  const { sendSms, setAllowedNumber } = useSms();

  useEffect(() => {
    (async () => {
      const a = await getStorage('devicePhoneNumber');
      console.log(a, 'ajsdfjueueueuu');
    })();
  }, []);

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
              'bg-[#F4F6F7] dark:bg-neutral-600 rounded-lg mx-6 my-5 py-3 px-2 flex-row gap-2 overflow-hidden'
            }
          >
            <View className={'w-2 bg-[#1659B1] h-[113px] rounded-xl'} />
            <View className={'w-[322px]'}>
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
        <View className="absolute bottom-0 left-0 right-0 px-6 py-6 ">
          <Button
            title={t('personalInformation.input.button.title' as any)}
            variant="primary"
            size="lg"
            fullWidth
            disabled={
              !(userPhoneNumber.length >= 11 && devicePhoneNumber.length >= 11)
            }
            onPress={async () => {
              await setStorage('devicePhoneNumber', devicePhoneNumber);
              await setStorage('userPhoneNumber', userPhoneNumber);
              // navigation.navigate('RegisterStep2');
              setAllowedNumber(devicePhoneNumber)
                .then((msg: string) => {
                  Alert.alert('✅', msg);
                  sendSms(
                    devicePhoneNumber,
                    `SETADMIN=0,${formatIranPhoneNumber(userPhoneNumber)}`,
                    'Admin_number_updated.',
                    ['wrong_password'],
                  );
                })
                .catch((err: any) => {
                  Alert.alert('❌ خطا', err.message);
                });
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
