import { createDigitValidator } from '../logic/createDigitValidator.js';

export const sanitizeInput = (value: string, base: number): string => {
  const isValid = createDigitValidator(base);
  return Array.from(value).map(c => c.toLowerCase()).filter(isValid).join('');
};