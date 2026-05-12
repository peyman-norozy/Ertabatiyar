import { changeLanguage } from '@/localization/changeLanguage.ts';
import { ScrollView, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { logo } from '@/shared/assets/images';
import AnimatedButton from '@/components/AnimatedButton.tsx';
import { iran, britain } from '@/shared/assets/images';

const languageData = [
  { title: 'فارسی', id: 'fa' as const, image: iran },
  { title: 'English', id: 'en' as const, image: britain },
] satisfies { title: string; id: 'fa' | 'en'; image: any }[];

const Language = () => {
  const { i18n } = useTranslation();

  const navigation = useNavigation<any>();
  // const displayedLanguages = isRTL ? [...languageData].reverse() : languageData;
  const displayedLanguages = languageData;
  return (
    <ScrollView
      className="flex-1 bg-[#3260C3]"
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
    >
      <View className="flex-1 items-center mt-[150px] px-6 bg-[#3260C3]">
        <View className={''}>
          <Image source={logo} className="w-[184px] h-[192px] bg-[#3260C3]" />
        </View>
        <View className="flex mt-32 gap-4">
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
        </View>
      </View>
    </ScrollView>
  );
};

export default Language;
