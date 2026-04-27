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
  const [error, setError] = useState<string | null>(null);
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
    onSuccess?: () => void,
  ) {
    stopListening();

    intervalRef.current = setInterval(async () => {
      try {
        const last = await SmsModule.getLastSms();

        if (!last) return;

        const sms = JSON.parse(last);
        setLastSms(sms);

        console.log('📩 SMS:', sms?.body?.includes(expectedText));

        if (expectedText && sms?.body?.includes(expectedText)) {
          stopListening();
          setLoading(false);
          setError(null);
          onSuccess?.();
          return;
        }

        if (errorTexts.some(err => sms?.body?.includes(err))) {
          stopListening();
          setLoading(false);

          console.log('❌ SMS Error received:', sms.body);
          return;
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
    setError(null);

    const hasPermission = await requestSmsPermissions();

    if (!hasPermission) {
      setError('دسترسی به پیامک‌ها داده نشده است. لطفاً مجوزها را فعال کنید.');
      return;
    }

    try {
      setLoading(true);
      console.log(phoneNumber, message, 'aaaaayyyuuutttereee');
      await SmsModule.sendSms(phoneNumber, message);

      startListening(expectedReply, errorTexts, newRoute);
    } catch (err) {
      setLoading(false);
      throw err;
    } finally {
      setLoading(false);
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
