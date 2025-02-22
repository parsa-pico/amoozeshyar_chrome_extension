import { parseTime } from './utils.js';

export function sortTable() {
  const table = document.getElementById('panel__3');
  if (!table) return;

  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((rowA, rowB) => {
    const textA = rowA.children[7].textContent.trim();
    const textB = rowB.children[7].textContent.trim();

    const timeA = parseTime(textA);
    const timeB = parseTime(textB);

    return timeA.dayIndex - timeB.dayIndex || timeA.startTime - timeB.startTime;
  });

  tbody.innerHTML = ''; // Clear table before reordering
  rows.forEach((row) => tbody.appendChild(row));
}
