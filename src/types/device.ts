export type DeviceEvent = {
  type: 'LIGHT_ON' | 'LIGHT_OFF' | 'ERROR';
  message: string;
  from?: string;
  timestamp: number;
};
