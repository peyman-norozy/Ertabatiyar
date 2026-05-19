import { useState } from 'react';
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';

import { changePassword } from '@/shared/assets/images';
import { Button, Input } from '@/shared/ui';
import { useTranslation } from 'react-i18next';
import { useSms } from '@/hook/useSms';
import { useAuth } from '@/context/AuthContext';
import { getStorage, setStorage } from '@/utils/storage';
import { useToast } from '@/context/ToastContext';

const Index = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { sendSms, setAllowedNumber, loading } = useSms();
  const { login } = useAuth();
  const [userCurrentPassword, setUserCurrentPassword] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userRepeatPassword, setUserRepeatPassword] = useState('');
  const [userErrorRepeatPassword, setUserErrorRepeatPassword] = useState('');

  const onClick = async () => {
    const devicePhoneNumber = (await getStorage('devicePhoneNumber')) || '';
    setAllowedNumber(devicePhoneNumber as any)
      .then(async () => {
        await sendSms(
          devicePhoneNumber as any,
          `${userCurrentPassword} NEWPASS=${userNewPassword}`,
          'password_changed_successfully.',
          ['access_denied', 'wrong_password!'],
          login,
          async () => {
            await setStorage('password', userNewPassword);
            showToast(t('successSMS.password_change'), 'success');
          },
        );
      })
      .catch((err: any) => {
        showToast(err.message, 'error');
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled
    >
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView
        className="flex-1 bg-white dark:bg-neutral-800"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 mx-4 mt-24 mb-20">
          <View className="flex-1 items-center mt-[48px] px-6">
            <View>
              <Image source={changePassword} className="w-[124px] h-[111px]" />
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
                        t('general.messages.repeatPasswordNotMatch' as any),
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
            loading={loading}
            disabled={
              !(
                userCurrentPassword.length >= 4 &&
                userNewPassword.length >= 4 &&
                userRepeatPassword.length >= 4
              )
            }
            onPress={onClick}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
