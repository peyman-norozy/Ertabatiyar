type DeviceZonesStorage = {
  zones: Record<string, string>;
  call: Record<string, string>;
  system: Record<string, string>;
  admin: string[];
};

export const parseDeviceSms = (body: string): DeviceZonesStorage => {
  console.log(body, 'asdfjueuegfgftasasasrtr');

  const zones: Record<string, string> = {};
  const call: Record<string, string> = {};
  const system: Record<string, string> = {};
  let admin: string[] = [];

  const admMatch = body.match(/ADM:\s*(.+)/);
  if (admMatch?.[1]) {
    admin = admMatch[1].trim().split(/\s+/).filter(Boolean);
  }

  const mainPart = body.split('ADM:')[0].trim();
  const tokens = mainPart.split(/\s+/).filter(Boolean);

  console.log(tokens, 'asdfjueuegvvvvbbnnhfgftasasasrtr');

  console.log(mainPart, 'asdfjueuegfgftasasasrtr');

  tokens.forEach(token => {
    const [key, value] = token.split(':');
    if (!key || !value) return;

    const cleanValue = value.split('/')[0].trim();
    console.log(cleanValue, 'asdfjueuegfgftrtr');
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

  return { zones, call, system, admin };
};
