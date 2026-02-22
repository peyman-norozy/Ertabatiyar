import React from 'react';
import { Button } from '@/shared/ui';
import { changeLanguage } from '@/localization/changeLanguage.ts';
import { ScrollView, View, Image, I18nManager } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { logo } from '@/shared/assets/images';
import AnimatedButton from '@/components/AnimatedButton.tsx';

const languageData = [
  { title: 'فارسی', id: 'fa' as const },
  { title: 'English', id: 'en' as const },
] satisfies { title: string; id: 'fa' | 'en' }[];

const Language = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const navigation = useNavigation<any>();
  const displayedLanguages = I18nManager.isRTL
    ? [...languageData].reverse()
    : languageData;
  return (
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
          <View className="flex-row mt-32 gap-4">
            {displayedLanguages.map(item => (
              <AnimatedButton
                key={item.id}
                title={item.title}
                active={i18n.language === item.id}
                onPress={async () => await changeLanguage(item.id)}
              />
            ))}
          </View>
        </View>
      </View>
      <View className="absolute bottom-0 left-0 right-0 px-6 py-6 bg-white dark:bg-black border border-[#EFEFEF] rounded-t-2xl">
        <Button
          title={t('personalInformation.input.button.title' as any)}
          variant="primary"
          size="lg"
          fullWidth
          onPress={() => navigation.navigate('LoginStep1')}
        />
      </View>
    </ScrollView>
  );
};

export default Language;
