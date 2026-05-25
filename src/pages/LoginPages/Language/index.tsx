import { changeLanguage } from '@/localization/changeLanguage.ts';
import { ScrollView, View, Image, I18nManager, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { logo } from '@/shared/assets/images';
import { iran, britain, china, russia } from '@/shared/assets/images';
import AnimatedButtonLanguage from '@/components/AnimatedButtonLanguage';
import Restart from 'react-native-restart';

const languageData = [
  { title: 'فارسی', id: 'fa' as const, image: iran },
  { title: 'English', id: 'en' as const, image: britain },
  { title: '中国人', id: 'zh' as const, image: china },
  { title: 'РУССИ', id: 'ru' as const, image: russia },
] satisfies { title: string; id: 'fa' | 'en' | 'zh' | 'ru'; image: any }[];

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
        <View className="flex-row w-full">
          <FlatList
            data={displayedLanguages}
            numColumns={2}
            scrollEnabled={false}
            keyExtractor={item => item.id}
            contentContainerStyle={{
              marginTop: 96,
            }}
            renderItem={({ item }) => (
              <View
                style={{ width: '50%', alignItems: 'center', marginBottom: 16 }}
              >
                <AnimatedButtonLanguage
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
                    const shouldRTL = item.id === 'fa';

                    await changeLanguage(item.id);

                    if (I18nManager.isRTL !== shouldRTL) {
                      I18nManager.allowRTL(shouldRTL);
                      I18nManager.forceRTL(shouldRTL);

                      Restart.Restart();
                      return;
                    }

                    navigation.replace('LoginStep1');
                  }}
                />
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Language;
