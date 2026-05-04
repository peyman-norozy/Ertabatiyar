import { useEffect, useState } from 'react';
import { getStorage, setStorage } from '@/utils/storage';
import type { ZoneKeyType } from '@/types/zone';

type ZonesType = Partial<Record<ZoneKeyType, string>>;

export const useZones = () => {
  const [zones, setZones] = useState<ZonesType>({});
  const [loading, setLoading] = useState(true);

  // ✅ load از storage
  const loadZones = async () => {
    try {
      const value = await getStorage('deviceZones');

      if (value) {
        const parsed = JSON.parse(value);

        const objectData = Array.isArray(parsed)
          ? Object.assign({}, ...parsed.filter((item: any) => !item.CALL))
          : parsed;

        setZones(objectData);
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

  // ✅ ذخیره در storage
  const saveZones = async (newZones: ZonesType) => {
    try {
      setZones(newZones);

      // اگر بخوای همون فرمت قبلی (array) رو نگه داری:
      const arrayFormat = Object.entries(newZones).map(([key, value]) => ({
        [key]: value,
      }));

      await setStorage('deviceZones', JSON.stringify(arrayFormat));
    } catch (e) {
      console.log('saveZones error:', e);
    }
  };

  // ✅ آپدیت یک zone
  const updateZone = async (key: ZoneKeyType, value: string) => {
    const updated = {
      ...zones,
      [key]: value,
    };

    await saveZones(updated);
  };

  return {
    zones,
    loading,
    setZones: saveZones, // full replace
    updateZone, // update تک آیتم
    reload: loadZones,
  };
};