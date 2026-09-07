import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Platform, PermissionsAndroid, NativeModules } from 'react-native';

export type Sms = {
  from: string;
  body: string;
  time: number;
};

const { SmsModule } = NativeModules;

interface SmsContextType {
  sendSms: (
    phoneNumber: string,
    message: string,
    expectedReply?: string,
    errorTexts?: string[],
    newRoute?: () => void,
    onFinal?: () => void,
  ) => Promise<Sms>;

  setAllowedNumber: (devicePhoneNumber: string) => Promise<any>;

  loading: boolean;

  lastSms: Sms | null;

  error: string | null;

  timeoutModalVisible: boolean;
  closeTimeoutModal: () => void;
}

const SmsContext = createContext<SmsContextType | undefined>(undefined);

export const SmsProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const [timeoutModalVisible, setTimeoutModalVisible] = useState(false);

  const [lastSms, setLastSms] = useState<Sms | null>(null);

  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeTimeoutModal = () => {
    setTimeoutModalVisible(false);
    setError(null);
  };

  async function requestSmsPermissions() {
    if (Platform.OS !== 'android') {
      return true;
    }

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

  function startListening(
    expectedText?: string,
    errorTexts: string[] = [],
    onSuccess?: (sms: Sms) => void,
    onFinal?: () => void,
    sentAt?: number,
    reject?: (reason?: any) => void,
  ) {
    stopListening();

    timeoutRef.current = setTimeout(() => {
      stopListening();

      setLoading(false);
      setError('timeout');

      setTimeoutModalVisible(true);

      reject?.('timeout');
    }, 30000);

    intervalRef.current = setInterval(async () => {
      try {
        const last = await SmsModule.getLastSms();

        if (!last) {
          return;
        }

        const sms: Sms = JSON.parse(last);

        if (sentAt && sms.time < sentAt) {
          return;
        }

        setLastSms(sms);

        if (expectedText && sms?.body?.includes(expectedText)) {
          stopListening();

          onFinal?.();

          setLoading(false);
          setError(null);

          onSuccess?.(sms);

          return;
        }

        if (errorTexts.some(err => sms.body.includes(err))) {
          stopListening();

          setLoading(false);

          reject?.(sms.body);

          return;
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
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

  return (
    <SmsContext.Provider
      value={{
        sendSms,
        setAllowedNumber,
        loading,
        lastSms,
        error,
        timeoutModalVisible,
        closeTimeoutModal,
      }}
    >
      {children}
    </SmsContext.Provider>
  );
};

export const useSms = () => {
  const context = useContext(SmsContext);

  if (!context) {
    throw new Error('useSms must be used inside SmsProvider');
  }

  return context;
};
