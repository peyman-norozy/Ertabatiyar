import { useEffect } from 'react';
import { subscribeToDeviceEvents } from './native/SmsEvents';
import { handleDeviceEvent } from './services/deviceEventHandler';
import { useDevice } from './context/DeviceContext';

export function AppBootstrap() {
  const { dispatch } = useDevice();

  useEffect(() => {
    const unsubscribe = subscribeToDeviceEvents(event =>
      handleDeviceEvent(event, dispatch),
    );

    return unsubscribe;
  }, [dispatch]);

  return null;
}
