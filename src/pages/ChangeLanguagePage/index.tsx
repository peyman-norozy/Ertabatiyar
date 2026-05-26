import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  I18nManager,
  FlatList,
} from 'react-native';
import { Text } from '@/shared/ui';
import { changeLanguage } from '@/localization/changeLanguage.ts';
import { useTranslation } from 'react-i18next';
const THEME_KEY = '@app_theme';
import { britain, iran, russia, china } from '@/shared/assets/images';
import { useNavigation } from '@react-navigation/native';
import AnimatedButtonLanguage from '@/components/AnimatedButtonLanguage';
import Restart from 'react-native-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useThemeMode } from '@/hook/useThemeMode';

const languageData = [
  { title: 'فارسی', id: 'fa' as const, image: iran },
  { title: 'English', id: 'en' as const, image: britain },
  { title: '中国人', id: 'zh' as const, image: china },
  { title: 'РУССИ', id: 'ru' as const, image: russia },
] satisfies { title: string; id: 'fa' | 'en' | 'zh' | 'ru'; image: any }[];

const Index = () => {
  const { i18n, t } = useTranslation();
  const navigation = useNavigation<any>();
  const { isDark } = useThemeMode();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      enabled
    >
      <StatusBar
        backgroundColor={isDark ? '#111827' : 'white'}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        className="flex-1 bg-white dark:bg-neutral-900"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
      >
        <View className="flex-1 mx-4 mt-6 mb-20">
          <View className="flex-1 mt-[48px] px-1 gap-3">
            <Text
              font={'font-yekan-bold'}
              className="text-black dark:text-white"
            >
              {t('general.changeLanguage')}
            </Text>
            <View className="flex-row w-full">
              <FlatList
                data={languageData}
                numColumns={2}
                scrollEnabled={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{
                  marginTop: 96,
                }}
                renderItem={({ item }) => (
                  <View
                    style={{
                      width: '50%',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    <AnimatedButtonLanguage
                      key={item.id}
                      title={item.title}
                      image={item.image}
                      fontSize={'text-sm'}
                      inActiveTitleColor={'text-black dark:text-white'}
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
