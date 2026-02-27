import { useEffect, useRef, useState } from 'react';
import { Platform, PermissionsAndroid, NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { SmsModule } = NativeModules;

export const useSms = () => {
  const [loading, setLoading] = useState(false);
  const [lastSms, setLastSms] = useState<{
    from: string;
    body: string;
    time: number;
  } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigation = useNavigation<any>();

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

  function startListening(
    expectedText?: string,
    errorTexts: string[] = [],
    newRoute?: () => void,
  ) {
    stopListening();

    intervalRef.current = setInterval(async () => {
      try {
        const last = await SmsModule.getLastSms();

        if (!last) return;

        const sms = JSON.parse(last);
        setLastSms(sms); // ✅ آخرین SMS را ذخیره می‌کنیم

        console.log('📩 SMS:', sms);

        if (sms?.body) {
          setLoading(false);
          newRoute && newRoute();
        }

        // ✅ اگر متن پاسخ مورد انتظار است
        if (expectedText && sms.body.includes(expectedText)) {
          stopListening();
        }

        // ✅ اگر متن پاسخ یک خطا است
        if (errorTexts.some(err => sms.body.includes(err))) {
          stopListening();
          console.log('❌ SMS Error received:', sms.body);
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }

  function stopListening() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  async function sendSms(
    phoneNumber: string,
    message: string,
    expectedReply?: string,
    errorTexts: string[] = [],
    newRoute?: () => void,
  ) {
    const hasPermission = await requestSmsPermissions();

    if (!hasPermission) {
      console.log('❌ اجازه SMS داده نشد');
      return;
    }

    try {
      setLoading(true);
      await SmsModule.sendSms(phoneNumber, message);

      startListening(expectedReply, errorTexts, newRoute);
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  async function setAllowedNumber(devicePhoneNumber: string) {
    return SmsModule.setAllowedNumber(devicePhoneNumber);
  }

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return {
    sendSms,
    setAllowedNumber,
    loading,
    lastSms, // ✅ آخرین SMS را برمی‌گردانیم
  };
};
