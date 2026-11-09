export interface GameRecord { attempts: number; timeMs: number; length: number; base: number; at: number; }
export interface RecordSettings { length: number; base: number; }
export const MAX_RECORDS = 10;

export const recordKey = ({ length, base }: RecordSettings): string => `bulls-and-cows:records:${length}:${base}`;
export const sortRecords = (records: readonly GameRecord[]): GameRecord[] =>
  [...records].sort((a, b) => a.attempts !== b.attempts ? a.attempts - b.attempts : a.timeMs - b.timeMs);
export const addRecord = (records: readonly GameRecord[], record: GameRecord): GameRecord[] =>
  sortRecords([...records, record]).slice(0, MAX_RECORDS);

export const serializeRecords = (records: readonly GameRecord[]): string => JSON.stringify(records);
export const deserializeRecords = (json: string): GameRecord[] => {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(r => r && typeof r.attempts === 'number' && typeof r.timeMs === 'number');
  } catch { return []; }
};