import { createDigitValidator } from '../logic/createDigitValidator.js';
export const sanitizeInput = (value, base) => {
    const isValid = createDigitValidator(base);
    return Array.from(value).map(c => c.toLowerCase()).filter(isValid).join('');
};
