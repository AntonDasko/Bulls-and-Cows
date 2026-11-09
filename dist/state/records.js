export const MAX_RECORDS = 10;
export const recordKey = ({ length, base }) => `bulls-and-cows:records:${length}:${base}`;
export const sortRecords = (records) => [...records].sort((a, b) => a.attempts !== b.attempts ? a.attempts - b.attempts : a.timeMs - b.timeMs);
export const addRecord = (records, record) => sortRecords([...records, record]).slice(0, MAX_RECORDS);
export const serializeRecords = (records) => JSON.stringify(records);
export const deserializeRecords = (json) => {
    try {
        const parsed = JSON.parse(json);
        if (!Array.isArray(parsed))
            return [];
        return parsed.filter(r => r && typeof r.attempts === 'number' && typeof r.timeMs === 'number');
    }
    catch {
        return [];
    }
};
