export const BASES = [{ value: 2, label: 'bin' }, { value: 8, label: 'oct' }, { value: 10, label: 'dec' }, { value: 16, label: 'hex' }] as const;
export const LENGTHS = [2, 3, 4, 5, 6] as const;
export const isLengthAvailable = (length: number, base: number): boolean => length <= base;
export const availableLengths = (base: number): number[] => LENGTHS.filter(len => len <= base);