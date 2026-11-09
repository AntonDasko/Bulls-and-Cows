import { loadRecords } from '../state/recordsStorage.js';
export const renderRecordsTable = ({ settings }) => {
    const el = (tag, props = {}, children = []) => {
        const node = document.createElement(tag);
        Object.assign(node, props);
        children.forEach(c => node.append(c));
        return node;
    };
    const records = loadRecords(settings);
    const table = el('table', { className: 'records' });
    const thead = el('thead', {}, [el('tr', {}, [el('th', { textContent: '#' }), el('th', { textContent: 'Attempts' }), el('th', { textContent: 'Time' })])]);
    const tbody = el('tbody');
    if (records.length === 0) {
        tbody.append(el('tr', {}, [el('td', { colSpan: 3, className: 'records__empty', textContent: 'No records yet.' })]));
    }
    else {
        records.forEach((r, i) => tbody.append(el('tr', {}, [
            el('td', { textContent: String(i + 1) }), el('td', { textContent: String(r.attempts) }),
            el('td', { textContent: `${Math.floor(r.timeMs / 1000)}s` })
        ])));
    }
    table.append(thead, tbody);
    return el('section', { className: 'records-section' }, [el('h3', { textContent: 'Top 10' }), table]);
};
