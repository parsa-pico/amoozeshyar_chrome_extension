import { sortTable } from '../utils/sortTable.js';

export default function handle(param) {
  const buttonLikeDiv = document.createElement('div');
  buttonLikeDiv.innerText = 'مرتب سازی';
  buttonLikeDiv.style.cursor = 'pointer';
  buttonLikeDiv.style.padding = '10px 20px';
  buttonLikeDiv.style.backgroundColor = '#4CAF50';
  buttonLikeDiv.style.color = 'white';
  buttonLikeDiv.style.textAlign = 'center';
  buttonLikeDiv.style.borderRadius = '5px';
  buttonLikeDiv.style.userSelect = 'none';
  buttonLikeDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  buttonLikeDiv.style.display = 'inline-block';

  buttonLikeDiv.addEventListener('click', async () => {
    sortTable();
  });

  const table = document.getElementById('panel__3');
  if (table) {
    table.parentNode.insertBefore(buttonLikeDiv, table);
  }
}
