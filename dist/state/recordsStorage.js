import { addRecord, deserializeRecords, recordKey, serializeRecords } from './records.js';
export const loadRecords = (settings) => {
    try {
        const json = globalThis.localStorage?.getItem(recordKey(settings));
        return json ? deserializeRecords(json) : [];
    }
    catch {
        return [];
    }
};
export const saveRecord = (record) => {
    const settings = { length: record.length, base: record.base };
    const next = addRecord(loadRecords(settings), record);
    try {
        globalThis.localStorage?.setItem(recordKey(settings), serializeRecords(next));
    }
    catch { }
    return next;
};
