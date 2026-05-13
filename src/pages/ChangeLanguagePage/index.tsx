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
import AnimatedButton from '@/components/AnimatedButton';
import { britain, iran } from '@/shared/assets/images';
import { useNavigation } from '@react-navigation/native';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const languageData = [
  { title: 'فارسی', id: 'fa' as const, image: iran },
  { title: 'English', id: 'en' as const, image: britain },
] satisfies { title: string; id: 'fa' | 'en'; image: any }[];

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
            {displayedLanguages.map(item => (
              <AnimatedButton
                key={item.id}
                title={item.title}
                image={item.image}
                fontSize={'text-sm'}
                inActiveTitleColor={'text-[#000000]'}
                activeBackgroundColor={'bg-[#6B95E0]'}
                showIcon
                width={'w-60'}
                height={'h-16'}
                active={i18n.language === item.id}
                onPress={async () => {
                  await changeLanguage(item.id);
                  navigation.replace('LoginStep1');
                }}
              />
            ))}
            <Text font={'font-yekan-bold'}>{t('general.changeTheme')}</Text>
            <ThemeSwitcher />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
