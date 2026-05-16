type DeviceZonesStorage = {
  zones: Record<string, string>;
  call: Record<string, string>;
  system: Record<string, Record<string, string>>;
  systemStatus: string;
  admin: string[];
  output: Record<string, string>;
};

export const parseDeviceSms = (body: string): DeviceZonesStorage => {
  const zones: Record<string, string> = {};

  const call: Record<string, string> = {};

  const system: Record<string, Record<string, string>> = {};

  const output: Record<string, string> = {};

  let admin: string[] = [];

  const admMatch = body.match(/ADM:\s*(.+)/);

  if (admMatch?.[1]) {
    admin = admMatch[1].trim().split(/\s+/).filter(Boolean);
  }

  const mainPart = body.split('ADM:')[0].trim();

  // SYS
  const sysMatch = mainPart.match(/SYS:([A-Z]+)/);

  const systemStatus = sysMatch?.[1] ?? '';

  // CALL
  const callMatch = mainPart.match(/CALL:([A-Z]+)/);

  if (callMatch) {
    call.CALL = callMatch[1];
  }

  // ZONES
  const zoneRegex =
    /(Z\d+):([A-Z0-9]+)\/([A-Z]+)\/([A-Z]+)(?:\/E:(\d+s))?(?:\/X:(\d+s))?/g;

  let match;

  while ((match = zoneRegex.exec(mainPart)) !== null) {
    const [, zoneKey, zoneStatus, outputValue, _idle, enterDelay, exitDelay] =
      match;

    zones[zoneKey] = zoneStatus;

    output[zoneKey] = outputValue;

    system[zoneKey] = {
      ...(system[zoneKey] || {}),
    };

    if (enterDelay) {
      system[zoneKey].E = enterDelay;
    }

    if (exitDelay) {
      system[zoneKey].X = exitDelay;
    }
  }

  return {
    zones,
    call,
    system,
    systemStatus,
    admin,
    output,
  };
};
