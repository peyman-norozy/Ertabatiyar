import { useEffect, useState } from 'react';
import { getStorage, setStorage } from '@/utils/storage';

export type DeviceZone = {
  type: string;
  output: string;
  status: string;
  enterDelay: string;
  exitDelay: string;
};

export type AddedZone = {
  key: string;
  title: string;
};

export type DeviceZonesStorage = {
  zones: Record<string, DeviceZone>;
  call: Record<string, string>;
  system: Record<string, string>;
  systemStatus: string;
};

export const useZones = () => {
  const [zones, setZones] = useState<Record<string, DeviceZone>>({});

  const [call, setCall] = useState<Record<string, string>>({});

  const [system, setSystem] = useState<Record<string, string>>({});

  const [systemStatus, setSystemStatus] = useState('');

  const [addedZones, setAddedZones] = useState<AddedZone[]>([]);

  const [loading, setLoading] = useState(true);

  // ============================================
  // Load Added Zones
  // ============================================

  const loadAddedZones = async () => {
    try {
      const savedZones = await getStorage('addedZones');

      setAddedZones(savedZones ? JSON.parse(savedZones) : []);
    } catch (e) {
      console.log('loadAddedZones error:', e);
    }
  };

  // ============================================
  // Load Device Zones
  // ============================================

  const loadZones = async () => {
    try {
      const value = await getStorage('deviceZones');

      if (value) {
        const parsed: Partial<DeviceZonesStorage> = JSON.parse(value);

        setZones(parsed.zones || {});
        setCall(parsed.call || {});
        setSystem(parsed.system || {});
        setSystemStatus(parsed.systemStatus || '');
      }

      await loadAddedZones();
    } catch (e) {
      console.log('loadZones error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  // ============================================
  // Save Zones
  // ============================================

  const saveZones = async (newZones: Record<string, DeviceZone>) => {
    try {
      const value = await getStorage('deviceZones');

      const parsed = value ? JSON.parse(value) : {};

      const updated = {
        ...parsed,
        zones: newZones,
      };

      setZones(newZones);

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('saveZones error:', e);
    }
  };

  // ============================================
  // Update Zone
  // ============================================

  const updateZone = async (key: string, value: string) => {
    try {
      const valueStorage = await getStorage('deviceZones');

      const parsed = valueStorage ? JSON.parse(valueStorage) : {};

      // ========================================
      // CALL
      // ========================================

      if (key === 'CALL') {
        const newCall = {
          ...(parsed.call || {}),
          CALL: value,
        };

        const updated = {
          ...parsed,
          call: newCall,
        };

        setCall(newCall);

        await setStorage('deviceZones', JSON.stringify(updated));

        return;
      }

      // ========================================
      // SYS
      // ========================================

      if (key === 'SYS') {
        const newSystem = {
          ...(parsed.system || {}),
          status: value,
        };

        const updated = {
          ...parsed,
          system: newSystem,
          systemStatus: value,
        };

        setSystem(newSystem);
        setSystemStatus(value);

        await setStorage('deviceZones', JSON.stringify(updated));

        return;
      }

      // ========================================
      // ZONE
      // ========================================

      const currentZone: DeviceZone = parsed.zones?.[key] || {
        type: 'O',
        output: 'N',
        status: 'I',
        enterDelay: '0',
        exitDelay: '0',
      };

      const newZone: DeviceZone = {
        ...currentZone,
        type: value,
      };

      const newZones = {
        ...(parsed.zones || {}),
        [key]: newZone,
      };

      const updated = {
        ...parsed,
        zones: newZones,
      };

      setZones(newZones);

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('updateZone error:', e);
    }
  };

  // ============================================
  // Update Zone Status
  // ============================================

  const updateZoneStatus = async (key: string, status: string) => {
    try {
      const valueStorage = await getStorage('deviceZones');

      const parsed = valueStorage ? JSON.parse(valueStorage) : {};

      const currentZone: DeviceZone = parsed.zones?.[key] || {
        type: 'O',
        output: 'N',
        status: 'I',
        enterDelay: '0',
        exitDelay: '0',
      };

      const newZone: DeviceZone = {
        ...currentZone,
        status,
      };

      const newZones = {
        ...(parsed.zones || {}),
        [key]: newZone,
      };

      const updated = {
        ...parsed,
        zones: newZones,
      };

      setZones(newZones);

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('updateZoneStatus error:', e);
    }
  };

  // ============================================
  // Update Zone Output
  // ============================================

  const updateOutput = async (zoneKey: string, value: string) => {
    try {
      const valueStorage = await getStorage('deviceZones');

      const parsed = valueStorage ? JSON.parse(valueStorage) : {};

      const currentZone: DeviceZone = parsed.zones?.[zoneKey] || {
        type: 'O',
        output: 'N',
        status: 'I',
        enterDelay: '0',
        exitDelay: '0',
      };

      const newZone: DeviceZone = {
        ...currentZone,
        output: value,
      };

      const newZones = {
        ...(parsed.zones || {}),
        [zoneKey]: newZone,
      };

      const updated = {
        ...parsed,
        zones: newZones,
      };

      setZones(newZones);

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('updateOutput error:', e);
    }
  };

  // ============================================
  // Update Zone System / Delay
  // ============================================

  const updateSystem = async (zoneId: string, key: string, value: string) => {
    try {
      const valueStorage = await getStorage('deviceZones');

      const parsed = valueStorage ? JSON.parse(valueStorage) : {};

      const currentZone: DeviceZone = parsed.zones?.[zoneId] || {
        type: 'O',
        output: 'N',
        status: 'I',
        enterDelay: '0',
        exitDelay: '0',
      };

      const newZone: DeviceZone = {
        ...currentZone,
      };

      if (key === 'E') {
        newZone.enterDelay = value;
      }

      if (key === 'X') {
        newZone.exitDelay = value;
      }

      const newZones = {
        ...(parsed.zones || {}),
        [zoneId]: newZone,
      };

      const updated = {
        ...parsed,
        zones: newZones,
      };

      setZones(newZones);

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('updateSystem error:', e);
    }
  };

  return {
    zones,
    call,
    system,
    addedZones,
    setAddedZones,
    loadAddedZones,
    loading,
    updateZone,
    updateZoneStatus,
    updateOutput,
    updateSystem,
    systemStatus,
    saveZones,
    reload: loadZones,
  };
};
