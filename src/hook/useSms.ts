import { useEffect, useRef, useState } from 'react';
import {
  Platform,
  PermissionsAndroid,
  NativeModules,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { errorFun } from '@/utils/errorTranslating';

export type Sms = {
  from: string;
  body: string;
  time: number;
};

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    onSuccess?: (sms: any) => void,
    onFinal?: () => void,
    sentAt?: number,
    reject?: any,
  ) {
    stopListening();

    timeoutRef.current = setTimeout(() => {
      stopListening();
      setLoading(false);
      setError('timeout');
      Alert.alert('⏱', 'پاسخی دریافت نشد');
    }, 20000);

    intervalRef.current = setInterval(async () => {
      try {
        const last = await SmsModule.getLastSms();

        if (!last) return;

        const sms = JSON.parse(last);
        if (sentAt && sms.time < sentAt) {
          return;
        }
        setLastSms(sms);

        console.log('📩 SMS:', sms?.body?.includes(expectedText));

        console.log('✅ Expected SMS received:', sms.body);
        console.log(errorTexts, 'sdjfuasasaseueu');
        if (expectedText && sms?.body?.includes(expectedText)) {
          stopListening();
          onFinal?.();
          setLoading(false);
          setError(null);
          onSuccess?.(sms);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          return;
        } else if (errorTexts.some(err => sms.body.includes(err))) {
          stopListening();
          setLoading(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          // Alert.alert('✅', errorFun(sms.body));
          console.log('❌ SMS Error received:', sms.body);
          reject(sms.body)
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
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  function sendSms(
    phoneNumber: string,
    message: string,
    expectedReply?: string,
    errorTexts: string[] = [],
    newRoute?: () => void,
    onFinal?: () => void,
  ): Promise<Sms> {
    return new Promise((resolve, reject) => {
      setError(null);

      requestSmsPermissions().then(hasPermission => {
        if (!hasPermission) {
          setError('دسترسی به پیامک‌ها داده نشده است.');
          reject('no-permission');
          return;
        }

        setLoading(true);
        const sentAt = Date.now();
        SmsModule.sendSms(phoneNumber, message)
          .then(() => {
            startListening(
              expectedReply,
              errorTexts,
              sms => {
                resolve(sms);
                newRoute?.();
              },
              onFinal,
              sentAt,
              reject,
            );
          })
          .catch((err: any) => {
            setLoading(false);
            reject(err);
          });
      });
    });
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
