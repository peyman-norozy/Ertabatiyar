import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Text } from '@/shared/ui';
import { changeLanguage } from '@/localization/changeLanguage.ts';
import { useTranslation } from 'react-i18next';

import { britain, iran, russia, china } from '@/shared/assets/images';
import { useNavigation } from '@react-navigation/native';
import AnimatedButtonLanguage from '@/components/AnimatedButtonLanguage';

const languageData = [
  { title: 'فارسی', id: 'fa' as const, image: iran },
  { title: 'English', id: 'en' as const, image: britain },
  { title: '中国人', id: 'zh' as const, image: china },
  { title: 'РУССИ', id: 'ru' as const, image: russia },
] satisfies { title: string; id: 'fa' | 'en' | 'zh' | 'ru'; image: any }[];

const Index = () => {
  const { i18n, t } = useTranslation();
  const displayedLanguages = languageData;
  const navigation = useNavigation<any>();

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
        <View className="flex-1 mx-4 mt-6 mb-20">
          <View className="flex-1 mt-[48px] px-1 gap-3">
            <Text font={'font-yekan-bold'}>{t('general.changeLanguage')}</Text>
            <View className="flex-row flex-wrap justify-center mt-8 gap-4">
              {displayedLanguages.map(item => (
                <AnimatedButtonLanguage
                  key={item.id}
                  title={item.title}
                  image={item.image}
                  fontSize={'text-sm'}
                  inActiveTitleColor={'text-[#000000]'}
                  activeBackgroundColor={'bg-[#6B95E0]'}
                  showIcon
                  width={'w-[170px]'}
                  height={'h-[110px]'}
                  active={i18n.language === item.id}
                  onPress={async () => {
                    await changeLanguage(item.id);
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
