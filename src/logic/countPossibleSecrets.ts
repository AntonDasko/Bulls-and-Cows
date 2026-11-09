const memo = new Map<string, number>();
let computeCount = 0;

const compute = (length: number, base: number): number => {
  computeCount += 1;
  if (length < 0 || length > base) return 0;
  if (length === 0) return 1;
  return base * compute(length - 1, base - 1);
};

export const countPossibleSecrets = (length: number, base: number): number => {
  const key = `${length}:${base}`;
  if (memo.has(key)) return memo.get(key)!;
  const result = compute(length, base);
  memo.set(key, result);
  return result;
};

export const __clearMemoCache = (): void => { memo.clear(); computeCount = 0; };
export const __getComputeCount = (): number => computeCount;