import { NativeEventEmitter, NativeModules } from 'react-native';
import { DeviceEvent } from '../types/device';

const emitter = new NativeEventEmitter(NativeModules.SmsModule ?? {});

export function subscribeToDeviceEvents(handler: (event: DeviceEvent) => void) {
  const sub = emitter.addListener('DEVICE_EVENT', handler);
  return () => sub.remove();
}
