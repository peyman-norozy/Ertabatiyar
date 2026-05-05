type DeviceZonesStorage = {
  zones: Record<string, string>;
  call: Record<string, string>;
  system: Record<string, string>;
};

export const parseDeviceSms = (body: string): DeviceZonesStorage => {
  const mainPart = body.split('ADM:')[0];

  const tokens = mainPart.split(/\s+/).filter(Boolean);

  const zones: Record<string, string> = {};
  const call: Record<string, string> = {};
  const system: Record<string, string> = {};

  tokens.forEach(token => {
    const [key, value] = token.split(':');
    if (!key || !value) return;

    const cleanValue = value.split('/')[0].trim();

    if (key === 'CALL') {
      call[key] = cleanValue;
    } else if (key === 'SYS') {
      system[key] = cleanValue;
    } else if (key.startsWith('Z')) {
      zones[key] = cleanValue;
    } else if (['E', 'X'].includes(key)) {
      system[key] = cleanValue;
    }
  });

  return { zones, call, system };
};
