import { useEffect, useState } from 'react';
import { getStorage, setStorage } from '@/utils/storage';

export const useZones = () => {
  const [zones, setZones] = useState<Record<string, string>>({});
  const [call, setCall] = useState<Record<string, string>>({});
  const [system, setSystem] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const loadZones = async () => {
    try {
      const value = await getStorage('deviceZones');

      if (value) {
        const parsed = JSON.parse(value);
        console.log(parsed, 'ajajjajajajueueueu');
        setZones(parsed.zones || {});
        setCall(parsed.call || {});
        setSystem(parsed.system || {});
      }
    } catch (e) {
      console.log('loadZones error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadZones();
  }, []);

  const saveZones = async (newZones: Record<string, string>) => {
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

  const updateZone = async (key: string, value: string) => {
    try {
      const valueStorage = await getStorage('deviceZones');
      const parsed = valueStorage ? JSON.parse(valueStorage) : {};
      let updated;
      if (key === 'CALL') {
        updated = {
          ...parsed,
          call: {
            ...parsed.call,
            [key]: value,
          },
        };

        setCall(updated.call);
      } else if (key === 'SYS') {
        updated = {
          ...parsed,
          system: {
            ...parsed.system,
            [key]: value,
          },
        };

        setSystem(updated.system);
      } else {
        const newZones = {
          ...zones,
          [key]: value,
        };

        updated = {
          ...parsed,
          zones: newZones,
        };

        setZones(newZones);
      }

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('updateZone error:', e);
    }
  };

  return {
    zones,
    call,
    system,
    loading,
    updateZone,
    reload: loadZones,
  };
};
