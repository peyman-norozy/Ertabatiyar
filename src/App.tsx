import React, { useEffect, useState } from 'react';
import i18n from './localization/i18n.ts';
import '../global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, NativeModules, I18nManager } from 'react-native';

import { AppRouter } from '@/app/router/AppRouter.tsx';
import { DeviceProvider } from '@/context/DeviceContext';
import { AppBootstrap } from '@/AppBootstrap';
import { ZonesProvider } from './context/ZonesContext.tsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Restart from 'react-native-restart';
import SplashScreen from './components/SplashScreen.tsx';

const { SmsModule } = NativeModules;

function App(): React.JSX.Element {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initLanguage();
  }, []);

  const initLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('appLanguage');

    const lang = (savedLanguage || 'fa') as 'fa' | 'en';

    const isRTL = lang === 'fa';

    // اگر RTL هماهنگ نبود
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);

      Restart.Restart();
      return;
    }

    // ست کردن زبان
    await i18n.changeLanguage(lang);

    // اپ آماده رندر
    setReady(true);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const last = await SmsModule.getLastSms();
      // console.log('📩 last_SMS:', last);

      if (!last) return;

      const sms = JSON.parse(last);
      // console.log('📩 SMS:', sms);

      if (sms.body === 'LIGHT ON') {
        // دستور
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!ready) return <SplashScreen />;
  return (
    <SafeAreaView className={'flex-1'}>
      <ZonesProvider>
        <DeviceProvider>
          <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar backgroundColor="white" />
            {/* فقط یک‌بار Native Event Listener */}
            <AppBootstrap />
            <AppRouter />
          </SafeAreaProvider>
        </DeviceProvider>
      </ZonesProvider>
    </SafeAreaView>
  );
}

export default App;
