import { DeviceEvent } from '../types/device';
import React from 'react';

export function handleDeviceEvent(
  event: DeviceEvent,
  dispatch: React.Dispatch<any>,
) {
  dispatch({
    type: event.type,
    payload: event,
  });
}
