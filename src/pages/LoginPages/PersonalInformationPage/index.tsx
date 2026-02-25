import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { logoBlue } from '@/shared/assets/images';
import { Input, Button, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { registerHandler } from 'react-native-gesture-handler/lib/typescript/handlers/handlersRegistry';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const forgotPassword = () => {};
  const registerHandler = () => {
    navigation.navigate('RegisterStep1');
  };

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
                  value={phoneNumber}
                  onChangeText={e => {
                    setPhoneNumber(e);
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
            <Text className={'text-base dark:text-white'} font={'font-yekan-medium'}>
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
            disabled={!(phoneNumber.length >= 11 && password.length > 2)}
            fullWidth
            onPress={() => console.log('set any thing')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationPage;
