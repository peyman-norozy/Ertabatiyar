import React, { useEffect, useState } from 'react';
import i18n from './localization/i18n.ts';
import '../global.css';

import {
  StatusBar,
  NativeModules,
  I18nManager,
  View,
  ActivityIndicator,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';

import { AppRouter } from '@/app/router/AppRouter.tsx';
import { DeviceProvider } from '@/context/DeviceContext';
import { AppBootstrap } from '@/AppBootstrap';
import { ZonesProvider } from './context/ZonesContext.tsx';
import { ToastProvider } from './context/ToastContext.tsx';
import { ZoneModalProvider } from './context/ZoneModalContext.tsx';
import { AppLoadingScreen } from './shared/ui/index.ts';
import { SmsProvider } from './context/SmsContext.tsx';
import GlobalSmsLoader from './components/GlobalSmsLoader.tsx';
import GlobalSmsTimeoutModal from './components/GlobalSmsTimeoutModal.tsx';

const { SmsModule } = NativeModules;

function App(): React.JSX.Element {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLanguage = async () => {
      try {
        const start = Date.now();

        const savedLanguage = await AsyncStorage.getItem('appLanguage');

        const lang = (savedLanguage || 'fa') as 'fa' | 'en' | 'zh' | 'ru';

        const isRTL = lang === 'fa';

        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);

          Restart.Restart();
          return;
        }

        await i18n.changeLanguage(lang);

        const elapsed = Date.now() - start;

        if (elapsed < 2200) {
          await new Promise((resolve: any) =>
            setTimeout(resolve, 2200 - elapsed),
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    initLanguage();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const last = await SmsModule.getLastSms();

        if (!last) return;

        const sms = JSON.parse(last);

        if (sms.body === 'LIGHT ON') {
          // دستور
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SmsProvider>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1 bg-white dark:bg-neutral-900">
          <StatusBar backgroundColor="white" barStyle="dark-content" />
          <ZonesProvider>
            <ZoneModalProvider>
              <DeviceProvider>
                <ToastProvider>
                  <AppBootstrap />
                  <AppRouter />
                </ToastProvider>
              </DeviceProvider>
            </ZoneModalProvider>
          </ZonesProvider>
          <GlobalSmsLoader />
          <GlobalSmsTimeoutModal />
          {loading && (
            <View className="absolute inset-0 z-[9999] items-center justify-center bg-blue-800">
              <AppLoadingScreen />
            </View>
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </SmsProvider>
  );
}

export default App;
