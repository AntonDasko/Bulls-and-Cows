import { addRecord, deserializeRecords, recordKey, serializeRecords, type GameRecord, type RecordSettings } from './records.js';

export const loadRecords = (settings: RecordSettings): GameRecord[] => {
  try {
    const json = globalThis.localStorage?.getItem(recordKey(settings));
    return json ? deserializeRecords(json) : [];
  } catch { return []; }
};

export const saveRecord = (record: GameRecord): GameRecord[] => {
  const settings = { length: record.length, base: record.base };
  const next = addRecord(loadRecords(settings), record);
  try { globalThis.localStorage?.setItem(recordKey(settings), serializeRecords(next)); } catch {}
  return next;
};