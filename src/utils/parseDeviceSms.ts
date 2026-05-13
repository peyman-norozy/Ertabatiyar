type DeviceZonesStorage = {
  zones: Record<string, string>;
  call: Record<string, string>;
  system: Record<string, string>;
  admin: string[];
  output: Record<string, string>;
};

export const parseDeviceSms = (body: string): DeviceZonesStorage => {
  const zones: Record<string, string> = {};
  const call: Record<string, string> = {};
  const system: Record<string, string> = {};
  const output: Record<string, string> = {};
  let admin: string[] = [];

  const admMatch = body.match(/ADM:\s*(.+)/);
  if (admMatch?.[1]) {
    admin = admMatch[1].trim().split(/\s+/).filter(Boolean);
  }

  const mainPart = body.split('ADM:')[0].trim();
  const tokens = mainPart.split(/\s+/).filter(Boolean);

  tokens.forEach(token => {
    const [key, value] = token.split(':');
    if (!key || !value) return;

    // مثال: OFF/BTH/IDLE
    const [zoneStatus, outputValue] = value.trim().split('/');

    if (key === 'CALL') {
      call[key] = zoneStatus;
    } else if (key === 'SYS') {
      system[key] = zoneStatus;
    } else if (key.startsWith('Z')) {
      // OFF
      zones[key] = zoneStatus;

      // BTH
      if (outputValue) {
        output[key] = outputValue;
      }
    } else if (['E', 'X'].includes(key)) {
      system[key] = zoneStatus;
    }
  });

  return {
    zones,
    call,
    system,
    admin,
    output,
  };
};
