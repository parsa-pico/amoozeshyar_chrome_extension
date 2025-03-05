import { getDivLikeButton } from '../../utils/HtmlElements.js';
import { sortTable } from './sortTable.js';

export default function ConfirmStudent(param) {
  const buttonLikeDiv = getDivLikeButton('مرتب کردن بر اساس روز و ساعت');
  buttonLikeDiv.onclick = () => {
    sortTable();
  };

  const table = document.getElementById('panel__3');
  if (table) {
    table.parentNode.insertBefore(buttonLikeDiv, table);
  }
}
