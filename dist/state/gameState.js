export const createInitialState = (settings, startedAt) => ({
    settings: { ...settings },
    history: [], startedAt, finishedAt: null, status: 'playing',
});
export const addAttempt = (state, guess, result, at) => {
    if (state.status === 'won')
        return state;
    const normGuess = guess.toLowerCase();
    if (state.history.some(a => a.guess.toLowerCase() === normGuess))
        return state;
    const entry = { guess: normGuess, ...result, at };
    const won = entry.bulls === state.settings.length;
    return {
        ...state,
        history: [...state.history, entry],
        status: won ? 'won' : 'playing',
        finishedAt: won ? at : state.finishedAt,
    };
};
export const isWin = (state) => state.status === 'won';
export const getAttemptsCount = (state) => state.history.length;
export const getElapsedMs = (state) => state.finishedAt === null ? null : state.finishedAt - state.startedAt;
