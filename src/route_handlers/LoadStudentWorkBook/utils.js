export function tableToJson(table) {
  let headers = Array.from(table.querySelectorAll('thead th')).map(
    (th) => th.innerText
  );
  let rows = Array.from(table.querySelectorAll('tbody > tr'));

  return rows.map((row) => {
    let cells = Array.from(row.querySelectorAll('td'));
    let obj = {};
    cells.forEach((cell, index) => {
      obj[headers[index]] = cell.innerText;
    });
    return obj;
  });
}
