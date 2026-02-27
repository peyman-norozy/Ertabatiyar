export const formatIranPhoneNumber = (phone: string) => {
  if (!phone) return '';

  const cleaned = phone.replace(/\s|-/g, '');

  if (cleaned.startsWith('0')) {
    return '+98' + cleaned.slice(1);
  }

  return cleaned;
};