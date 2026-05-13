import { useEffect, useState } from 'react';
import { getStorage, setStorage } from '@/utils/storage';
import { formatIranPhoneNumber } from '@/utils/formatIranPhoneNumber';

export type AddedZone = {
  key: string;
  title: string;
};

export const useZones = () => {
  const [zones, setZones] = useState<Record<string, string>>({});

  const [call, setCall] = useState<Record<string, string>>({});

  const [system, setSystem] = useState<Record<string, string>>({});

  const [admin, setAdmin] = useState<string[]>([]);

  const [addedZones, setAddedZones] = useState<AddedZone[]>([]);

  const [output, setOutput] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(true);

  const loadAddedZones = async () => {
    try {
      const savedZones = await getStorage('addedZones');

      setAddedZones(savedZones ? JSON.parse(savedZones) : []);
    } catch (e) {
      console.log('loadAddedZones error:', e);
    }
  };

  const loadZones = async () => {
    try {
      const value = await getStorage('deviceZones');

      if (value) {
        const parsed = JSON.parse(value);

        setZones(parsed.zones || {});
        setCall(parsed.call || {});
        setSystem(parsed.system || {});
        setAdmin(parsed.admin || []);
        setOutput(parsed.output || {});
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
        const newCall = {
          ...(parsed.call || {}),
          [key]: value,
        };

        updated = {
          ...parsed,
          call: newCall,
        };

        setCall(newCall);
      } else if (key === 'SYS') {
        const newSystem = {
          ...(parsed.system || {}),
          [key]: value,
        };

        updated = {
          ...parsed,
          system: newSystem,
        };

        setSystem(newSystem);
      } else if (key === 'ADMIN') {
        const currentAdmins = parsed.admin || [];

        const formattedValue = formatIranPhoneNumber(value);

        const newAdmin = currentAdmins.includes(formattedValue)
          ? currentAdmins
          : [...currentAdmins, formattedValue];

        updated = {
          ...parsed,
          admin: newAdmin,
        };

        setAdmin(newAdmin);
      } else if (key === 'REMOVE_ADMIN') {
        const newAdmin = JSON.parse(value);

        updated = {
          ...parsed,
          admin: newAdmin,
        };

        setAdmin(newAdmin);
      } else {
        const newZones = {
          ...(parsed.zones || {}),
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

  const updateOutput = async (zoneKey: string, value: string) => {
    try {
      const valueStorage = await getStorage('deviceZones');

      const parsed = valueStorage ? JSON.parse(valueStorage) : {};

      const newOutput = {
        ...(parsed.output || {}),
        [zoneKey]: value,
      };

      const updated = {
        ...parsed,
        output: newOutput,
      };

      setOutput(newOutput);

      await setStorage('deviceZones', JSON.stringify(updated));
    } catch (e) {
      console.log('updateOutput error:', e);
    }
  };

  return {
    zones,
    call,
    system,
    admin,
    output,
    addedZones,
    setAddedZones,
    loadAddedZones,
    loading,
    updateZone,
    updateOutput,
    saveZones,
    reload: loadZones,
  };
};
