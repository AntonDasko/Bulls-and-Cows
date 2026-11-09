export interface GuessResult { bulls: number; cows: number; }

export const evaluateGuess = (secret: string, guess: string): GuessResult => {
  const s = secret.toLowerCase().split('');
  const g = guess.toLowerCase().split('');
  
  const bulls = g.reduce((acc, d, i) => d === s[i] ? acc + 1 : acc, 0);
  const nonBullS = s.filter((d, i) => d !== g[i]);
  const nonBullG = g.filter((d, i) => d !== s[i]);
  const remaining = new Set(nonBullS);
  
  const cows = nonBullG.filter(d => remaining.has(d)).length;
  return { bulls, cows };
};