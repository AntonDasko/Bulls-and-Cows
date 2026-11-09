export const generateSecret = (length, base, random = Math.random) => {
    if (length > base)
        throw new Error(`length (${length}) cannot exceed base (${base})`);
    const pool = Array.from({ length: base }, (_, i) => i.toString(36));
    const pick = (rem, count, acc) => {
        if (count === 0)
            return acc;
        const idx = Math.floor(random() * rem.length);
        const digit = rem[idx];
        return pick(rem.filter((_, i) => i !== idx), count - 1, acc + digit);
    };
    return pick(pool, length, '');
};
