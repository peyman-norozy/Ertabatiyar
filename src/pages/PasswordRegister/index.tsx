import React, { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';

import { logoBlue } from '@/shared/assets/images';
import { Button, Input, Text } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const Index = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [userCurrentPassword, setUserCurrentPassword] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userRepeatPassword, setUserRepeatPassword] = useState('');
  const [userErrorRepeatPassword, setUserErrorRepeatPassword] = useState('');

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
                  label={t('personalInformation.input.password.current' as any)}
                  placeholder={t(
                    'personalInformation.input.password.placeHolder' as any,
                  )}
                  keyboardType="numeric"
                  maxLength={20}
                  type="password"
                  value={userCurrentPassword}
                  onChangeText={e => {
                    setUserCurrentPassword(e);
                  }}
                />
              </View>
              <View className="w-full mt-6">
                <Input
                  label={t('personalInformation.input.password.new' as any)}
                  placeholder={t(
                    'personalInformation.input.password.placeHolder' as any,
                  )}
                  keyboardType="numeric"
                  maxLength={20}
                  type="password"
                  value={userNewPassword}
                  onChangeText={e => {
                    setUserNewPassword(e);
                  }}
                />
              </View>
              <View className="w-full mt-6">
                <Input
                  label={t(
                    'personalInformation.input.password.repeatNew' as any,
                  )}
                  placeholder={t(
                    'personalInformation.input.password.placeHolder' as any,
                  )}
                  keyboardType="numeric"
                  maxLength={20}
                  type="password"
                  value={userRepeatPassword}
                  onChangeText={e => {
                    setUserErrorRepeatPassword('');
                    if (e !== userNewPassword) {
                      setUserErrorRepeatPassword(
                        'رمز عبور و تکرار آن یکسان نیستند.',
                      );
                    }
                    setUserRepeatPassword(e);
                  }}
                  error={userErrorRepeatPassword}
                />
              </View>
            </View>
          </View>
        </View>
        <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] rounded-t-2xl">
          <Button
            title={t('personalInformation.input.button.title' as any)}
            variant="primary"
            size="lg"
            fullWidth
            disabled={
              !(
                userCurrentPassword.length >= 8 &&
                userNewPassword.length >= 8 &&
                userRepeatPassword.length >= 8
              )
            }
            onPress={() => navigation.navigate('RegisterStep2')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
