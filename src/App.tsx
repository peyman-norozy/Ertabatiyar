/**
 * @format
 */
import React, { useEffect } from 'react';
import '../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
    <DeviceProvider>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar />
        {/* فقط یک‌بار Native Event Listener */}
        <AppBootstrap />
        <AppRouter />
      </SafeAreaProvider>
    </DeviceProvider>
  );
}

export default App;
