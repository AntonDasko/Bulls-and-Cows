import { countPossibleSecrets } from '../logic/countPossibleSecrets.js';
import { BASES, LENGTHS, availableLengths, isLengthAvailable } from './settingsLogic.js';

export interface Settings { length: number; base: number; }
export interface SettingsScreenHandlers { onStart: (settings: Settings) => void; }

export const renderSettingsScreen = (handlers: SettingsScreenHandlers): HTMLElement => {
  const el = (tag: string, props: any = {}, children: any[] = []) => {
    const node = document.createElement(tag);
    Object.assign(node, props);
    children.forEach(c => node.append(c));
    return node;
  };

  const baseSelect = el('select', { id: 'base-select' });
  BASES.forEach(b => baseSelect.append(el('option', { value: String(b.value), textContent: b.label })));
  baseSelect.value = '10';

  const lengthSelect = el('select', { id: 'length-select' });
  const rebuildLengths = () => {
    const base = Number(baseSelect.value);
    lengthSelect.replaceChildren();
    LENGTHS.forEach(len => {
      const opt = el('option', { value: String(len), textContent: String(len) });
      if (!isLengthAvailable(len, base)) opt.disabled = true;
      lengthSelect.append(opt);
    });
    const allowed = availableLengths(base);
    if (!allowed.includes(Number(lengthSelect.value))) lengthSelect.value = String(allowed[0]);
  };

  const variantsOut = el('output', { id: 'variants-out' });
  const refreshVariants = () => {
    const base = Number(baseSelect.value);
    const length = Number(lengthSelect.value);
    variantsOut.textContent = `Possible secrets: ${countPossibleSecrets(length, base)}`;
  };

  baseSelect.addEventListener('change', () => { rebuildLengths(); refreshVariants(); });
  lengthSelect.addEventListener('change', refreshVariants);

  const startBtn = el('button', { textContent: 'Start game', className: 'settings__start' });
  startBtn.addEventListener('click', () => handlers.onStart({ length: Number(lengthSelect.value), base: Number(baseSelect.value) }));

  rebuildLengths(); refreshVariants();

  return el('div', { className: 'settings' }, [
    el('h1', { textContent: 'Bulls and Cows' }),
    el('label', { htmlFor: 'base-select', textContent: 'Numeral system' }), baseSelect,
    el('label', { htmlFor: 'length-select', textContent: 'Secret length' }), lengthSelect,
    variantsOut, startBtn,
  ]);
};