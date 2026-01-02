import React, { createContext, useContext, useReducer } from 'react';
import { DeviceEvent } from '../types/device';

type State = {
  light: 'ON' | 'OFF';
  lastMessage?: string;
  lastUpdated?: number;
};

type Action =
  | { type: 'LIGHT_ON'; payload: DeviceEvent }
  | { type: 'LIGHT_OFF'; payload: DeviceEvent }
  | { type: 'ERROR'; payload: DeviceEvent };

const initialState: State = {
  light: 'OFF',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LIGHT_ON':
      return {
        ...state,
        light: 'ON',
        lastMessage: action.payload.message,
        lastUpdated: action.payload.timestamp,
      };

    case 'LIGHT_OFF':
      return {
        ...state,
        light: 'OFF',
        lastMessage: action.payload.message,
        lastUpdated: action.payload.timestamp,
      };

    case 'ERROR':
      return {
        ...state,
        lastMessage: action.payload.message,
        lastUpdated: action.payload.timestamp,
      };

    default:
      return state;
  }
}

const DeviceContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function DeviceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DeviceContext.Provider value={{ state, dispatch }}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    throw new Error('useDevice must be used inside DeviceProvider');
  }
  return ctx;
}
