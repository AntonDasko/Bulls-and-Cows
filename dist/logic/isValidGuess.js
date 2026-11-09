import { createDigitValidator } from './createDigitValidator.js';
export const isValidGuess = (guess, length, base) => {
    if (guess.length !== length)
        return false;
    const isValid = createDigitValidator(base);
    const normalized = guess.toLowerCase().split('');
    return normalized.every(isValid) && new Set(normalized).size === length;
};
