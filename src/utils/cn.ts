// src/shared/lib/cn.ts
export const cn = (...classes: (string | false | undefined)[]) =>
  classes.filter(Boolean).join(' ');
