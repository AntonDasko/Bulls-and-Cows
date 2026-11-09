export const BASES = [{ value: 2, label: 'bin' }, { value: 8, label: 'oct' }, { value: 10, label: 'dec' }, { value: 16, label: 'hex' }];
export const LENGTHS = [2, 3, 4, 5, 6];
export const isLengthAvailable = (length, base) => length <= base;
export const availableLengths = (base) => LENGTHS.filter(len => len <= base);
