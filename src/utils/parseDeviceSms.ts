export type DeviceZone = {
  type: string;
  output: string;
  status: string;
  enterDelay: string;
  exitDelay: string;
};

export type DeviceZonesStorage = {
  zones: Record<string, DeviceZone>;
  call: Record<string, string>;
  system: Record<string, string>;
  systemStatus: string;
  admin: string[];
};

export const parseDeviceSms = (body: string): DeviceZonesStorage => {
  const zones: Record<string, DeviceZone> = {};
  const call: Record<string, string> = {};
  const system: Record<string, string> = {};

  let admin: string[] = [];

  const normalizedBody = body
    .replace(/\r/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // ============================================
  // ADM
  // ============================================

  const admMatch = normalizedBody.match(/ADM:\s*(.+)$/);

  if (admMatch?.[1]) {
    admin = admMatch[1]
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  // ============================================
  // SYS
  // ============================================

  const sysMatch = normalizedBody.match(/(?:^|\s)SYS:([A-Z]+)/);

  const systemStatus = sysMatch?.[1] ?? '';

  if (systemStatus) {
    system.status = systemStatus;
  }

  // ============================================
  // CALL
  // ============================================

  const callMatch = normalizedBody.match(/(?:^|\s)C:(\d+)/);

  if (callMatch?.[1]) {
    call.CALL = callMatch[1];
  }

  // ============================================
  // ZONES
  // ============================================

  /**
   * Format:
   *
   * Z1:N/B/I/0/0
   *
   * Z2:24/B/T/10/30
   *
   * Z3:S/P/I/0/0
   *
   * Structure:
   *
   * Z<number>:TYPE/OUTPUT/STATUS/ENTRY_DELAY/EXIT_DELAY
   */

  const zoneRegex =
    /(?:^|\s)(Z\d+):([^/\s]+)\/([^/\s]+)\/([^/\s]+)\/([^/\s]+)\/([^/\s]+)/g;

  let match: RegExpExecArray | null;

  while ((match = zoneRegex.exec(normalizedBody)) !== null) {
    const [
      ,
      zoneKey,
      type,
      output,
      status,
      enterDelay,
      exitDelay,
    ] = match;

    zones[zoneKey] = {
      type,
      output,
      status,
      enterDelay,
      exitDelay,
    };
  }

  return {
    zones,
    call,
    system,
    systemStatus,
    admin,
  };
};