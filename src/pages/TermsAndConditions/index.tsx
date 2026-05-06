import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui';

const Index = () => {
  const { t } = useTranslation();

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
            <Text font={'font-yekan-bold'}>لورم ایپسوم که گاهی اوقات</Text>
            <Text font={'font-yekan-medium'} className="text-justify text-sm">
              لورم ایپسوم که گاهی اوقات به آن “لیپسوم” نیز گفته می شود، متن مکان
              نگهدار مورد استفاده در طراحی هنگام ایجاد محتوا است. این به طراحان
              کمک می کند تا بدون نیاز به نوشتن و تأیید محتوا، برنامه ریزی کنند
              که محتوا در کجا قرار می گیرد. از لورم ایپسوم اغلب در چیدمان چاپ،
              اینفوگرافیک یا طراحی وب استفاده می شود. هدف اصلی لورم ایپسوم این
              است که طراح وقت خود را برای نوشتن متن هدر ندهد و از یک متن آماده
              برای
            </Text>
            <Text font={'font-yekan-bold'}>لورم ایپسوم که گاهی اوقات</Text>
            <Text font={'font-yekan-medium'} className="text-justify text-sm">
              لورم ایپسوم که گاهی اوقات به آن “لیپسوم” نیز گفته می شود، متن مکان
              نگهدار مورد استفاده در طراحی هنگام ایجاد محتوا است. این به طراحان
              کمک می کند تا بدون نیاز به نوشتن و تأیید محتوا، برنامه ریزی کنند
              که محتوا در کجا قرار می گیرد. از لورم ایپسوم اغلب در چیدمان چاپ،
              اینفوگرافیک یا طراحی وب استفاده می شود. هدف اصلی لورم ایپسوم این
              است که طراح وقت خود را برای نوشتن متن هدر ندهد و از یک متن آماده
              برای
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Index;
