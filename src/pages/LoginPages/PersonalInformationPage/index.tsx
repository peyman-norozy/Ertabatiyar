import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  View,
} from 'react-native';
import { logo } from '@/shared/assets/images';
import { Input, Button } from '@/shared/ui';
import { changeLanguage } from '@/localization/changeLanguage.ts';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

const PersonalInformationPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled
    >
      <ScrollView
        className="flex-1 bg-[#F9F9F9]"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 bg-white dark:bg-black border border-[#EFEFEF] rounded-2xl mx-4 mt-6 mb-20">
          <View className="flex-1 items-center mt-[48px] px-6">
            <View>
              <Image source={logo} className="w-[124px] h-[117px]" />
            </View>

            <View className="mt-[56px] w-full">
              <Button title="فارسی" onPress={() => changeLanguage('fa')} />
              <Button title="English" onPress={() => changeLanguage('en')} />

              <View className="w-full mt-4">
                <Input
                  label={t('personalInformation.input.userName.title' as any)}
                  placeholder={t(
                    'personalInformation.input.userName.placeHolder' as any,
                  )}
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
                />
              </View>
            </View>
            <View className="h-20" />
          </View>
        </View>
        <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] rounded-t-2xl">
          <Button
            title={t('personalInformation.input.button.title' as any)}
            variant="primary"
            size="lg"
            fullWidth
            onPress={() => navigation.navigate('LoginStep2')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationPage;
