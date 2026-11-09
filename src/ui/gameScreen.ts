import { evaluateGuess } from '../logic/evaluateGuess.js';
import { isValidGuess } from '../logic/isValidGuess.js';
import { addAttempt, getElapsedMs, isWin, type Attempt, type GameState } from '../state/gameState.js';
import { sanitizeInput } from './inputFilter.js';

export interface GameScreenHandlers { onStateChange: (s: GameState) => void; onWin: (s: GameState) => void; onNewGame: () => void; }
export interface GameScreenContext { state: GameState; secret: string; handlers: GameScreenHandlers; }

const el = (tag: string, props: any = {}, children: any[] = []) => {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.forEach(c => node.append(c));
  return node;
};
const formatMs = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor((ms % 60000) / 1000)).padStart(2, '0')}`;

export const renderGameScreen = (ctx: GameScreenContext): HTMLElement => {
  let state = ctx.state;
  const { secret, handlers } = ctx;
  const { length, base } = state.settings;

  const newGameBtn = el('button', { className: 'game__new', textContent: 'New game' });
  newGameBtn.addEventListener('click', handlers.onNewGame);

  const header = el('header', { className: 'game__header' }, [
    el('h2', { textContent: `Bulls and Cows (length ${length}, base ${base})` }),
    newGameBtn,
  ]);

  const timer = el('output', { className: 'game__timer', textContent: '0:00' });
  const updateTimer = () => { timer.textContent = formatMs(getElapsedMs(state) ?? Date.now() - state.startedAt); };
  const timerInterval = window.setInterval(updateTimer, 250);
  updateTimer();

  const input = el('input', { type: 'text', maxLength: length, className: 'game__input', id: 'guess-input' });
  input.addEventListener('input', () => { const clean = sanitizeInput(input.value, base); if (clean !== input.value) input.value = clean; });

  const error = el('div', { className: 'game__error' });
  const historyList = el('ol', { className: 'game__history' });
  const renderHistory = (history: readonly Attempt[]) => {
    historyList.replaceChildren();
    history.forEach(a => historyList.append(el('li', { className: 'game__history-item' }, [
      el('span', { className: 'game__guess', textContent: a.guess }),
      el('span', { className: 'game__result', textContent: ` — bulls: ${a.bulls}, cows: ${a.cows}` }),
    ])));
  };
  renderHistory(state.history);

  const status = el('div', { className: 'game__status' });
  const submitBtn = el('button', { className: 'game__submit', textContent: 'Check', id: 'check-btn' });

  const disableInputs = () => { submitBtn.disabled = true; input.disabled = true; clearInterval(timerInterval); };
  const finishWin = (wonState: GameState) => {
    status.textContent = `You won! Attempts: ${wonState.history.length}, time: ${formatMs(getElapsedMs(wonState) ?? 0)}.`;
    disableInputs(); handlers.onWin(wonState);
  };

  const submit = () => {
    if (isWin(state)) return;
    const guess = input.value; error.textContent = '';
    if (!isValidGuess(guess, length, base)) {
      error.textContent = `Invalid guess: must be ${length} unique digits valid for base ${base}.`; return;
    }
    const next = addAttempt(state, guess, evaluateGuess(secret, guess), Date.now());
    state = next; renderHistory(next.history); input.value = ''; handlers.onStateChange(next);
    if (isWin(next)) finishWin(next);
  };

  submitBtn.addEventListener('click', submit);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });

  const inputRow = el('div', { className: 'game__input-row' }, [input, submitBtn]);
  if (isWin(state)) finishWin(state);

  return el('section', { className: 'game' }, [
    header, timer, el('label', { htmlFor: 'guess-input', textContent: `Enter ${length} digits: ` }),
    inputRow, error, status, el('h3', { textContent: 'History' }), historyList,
  ]);
};