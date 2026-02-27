import React, { useEffect, useState } from 'react';
import {
  NativeModules,
  View,
  PermissionsAndroid,
  Platform,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import { CustomBottomTab } from '@/shared/ui/bottomTab/ui';
import { useDevice } from '@/context/DeviceContext';
import SensorsMode from '@/components/SensorsMode.tsx';
import Sensors from '@/components/Sensors.tsx';
import CallMode from '@/components/CallMode.tsx';
import Admin from '@/components/Admin.tsx';

const { SmsModule } = NativeModules;

const HomePage = () => {
  const { state } = useDevice();

  // State برای ذخیره آخرین پیام دریافتی
  const [lastSms, setLastSms] = useState<{
    phoneNumber: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    SmsModule.getAllSms().then((data:any) => {
      console.log('📨 SMS LIST:', data);
    });
  }, []);

  async function requestSmsPermissions() {
    if (Platform.OS !== 'android') return true;

    const permissions = [
      PermissionsAndroid.PERMISSIONS.SEND_SMS,

      
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    ];

    const result = await PermissionsAndroid.requestMultiple(permissions);

    return Object.values(result).every(
      r => r === PermissionsAndroid.RESULTS.GRANTED,
    );
  }

  async function sendSms(phoneNumber: string, message: string) {
    const hasPermission = await requestSmsPermissions();
    if (!hasPermission) {
      console.log('❌ اجازه ارسال SMS داده نشد');
      return;
    }

    SmsModule.sendSms(phoneNumber, message)
      .then((res:any) => console.log(res, 'hhgggg'))
      .catch((err:any) => console.log(err));
  }

  return (
    <View className="flex-1 bg-[#F9F9F9]">
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <ScrollView>
        <View className="w-full h-72 overflow-hidden pt-6">
          <Image
            source={require('../../shared/assets/images/banner_main.png')}
            resizeMode="cover"
            className="w-full h-full"
          />
        </View>
        <SensorsMode />
        <Sensors />
        <CallMode />
        <Admin />
      </ScrollView>
      {/*<View className="flex-1 items-center justify-center">*/}
      {/*  <Text className="text-lg text-white bg-red-500 p-4 rounded-2xl">*/}
      {/*    صفحه خانه*/}
      {/*  </Text>*/}

      {/*  <Button*/}
      {/*    onPress={() => sendSms('09362718986', 'hi peyman')}*/}
      {/*    title="ارسال SMS"*/}
      {/*    color="#841584"*/}
      {/*  />*/}

      {/*  /!* وضعیت دستگاه *!/*/}
      {/*  <View className="mt-4 p-4 bg-gray-800 rounded-xl">*/}
      {/*    <Text className="text-white text-base">*/}
      {/*      💡 وضعیت چراغ: {state.light}*/}
      {/*    </Text>*/}

      {/*    {state.lastMessage && (*/}
      {/*      <Text className="text-gray-300 mt-2">*/}
      {/*        آخرین پیام چراغ: {state.lastMessage}*/}
      {/*      </Text>*/}
      {/*    )}*/}

      {/*    {lastSms && (*/}
      {/*      <View className="mt-2 p-2 bg-gray-700 rounded">*/}
      {/*        <Text className="text-white">📩 SMS جدید:</Text>*/}
      {/*        <Text className="text-gray-200">*/}
      {/*          فرستنده: {lastSms.phoneNumber}*/}
      {/*        </Text>*/}
      {/*        <Text className="text-gray-200">متن: {lastSms.message}</Text>*/}
      {/*      </View>*/}
      {/*    )}*/}
      {/*  </View>*/}
      {/*</View>*/}

      <CustomBottomTab />
    </View>
  );
};

export default HomePage;
