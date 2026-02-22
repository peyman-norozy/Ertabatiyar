import React, { useEffect } from 'react';
import './localization/i18n.ts';
import '../global.css';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, NativeModules } from 'react-native';

import { AppRouter } from '@/app/router/AppRouter.tsx';
import { DeviceProvider } from '@/context/DeviceContext';
import { AppBootstrap } from '@/AppBootstrap';

const { SmsModule } = NativeModules;

function App(): React.JSX.Element {
  useEffect(() => {
    const interval = setInterval(async () => {
      const last = await SmsModule.getLastSms();
      console.log('📩 last_SMS:', last);

      if (!last) return;

      const sms = JSON.parse(last);
      console.log('📩 SMS:', sms);

      if (sms.body === 'LIGHT ON') {
        // دستور
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView className={'flex-1'}>
      <DeviceProvider>
        <SafeAreaProvider style={{ flex: 1 }}>
          <StatusBar backgroundColor="white" />
          {/* فقط یک‌بار Native Event Listener */}
          <AppBootstrap />
          <AppRouter />
        </SafeAreaProvider>
      </DeviceProvider>
    </SafeAreaView>
  );
}

export default App;
