import React, { createContext, useContext } from 'react';
import { useZones } from '@/hook/useZones';

const ZonesContext = createContext<ReturnType<typeof useZones> | null>(null);

export const ZonesProvider = ({ children }: { children: React.ReactNode }) => {
  const zonesState = useZones();

  return (
    <ZonesContext.Provider value={zonesState}>{children}</ZonesContext.Provider>
  );
};

export const useZonesContext = () => {
  const context = useContext(ZonesContext);
  if (!context) throw new Error('useZonesContext must be used inside provider');
  return context;
};
