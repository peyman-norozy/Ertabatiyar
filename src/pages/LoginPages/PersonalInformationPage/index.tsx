import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Button,
  View,
} from 'react-native';
import { logo } from '@/shared/assets/images';
import { Input, Text } from '@/shared/ui';
import { changeLanguage } from '@/localization/changeLanguage.ts';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from '@/components/ThemeSwitcher.tsx';

const PersonalInformationPage = () => {
  const { t } = useTranslation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled
    >
      <ScrollView
        className="flex-1 bg-white dark:bg-black"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 items-center mt-[48px] px-6">
          <View>
            <Image source={logo} className="w-[124px] h-[117px]" />
          </View>

          <View className="mt-[56px] w-full">
            <Button title="فارسی" onPress={() => changeLanguage('fa')} />
            <Button title="English" onPress={() => changeLanguage('en')} />
            <ThemeSwitcher />

            <Text className="bg-blue-500 dark:bg-red-500 text-white dark:text-black my-4 p-2 rounded">
              {t('peyman.name' as any)}
            </Text>

            <View className="w-full mb-6">
              <Input label="نام کامل" placeholder="پیمان ..." />
            </View>
          </View>

          <View className="h-20" />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PersonalInformationPage;
