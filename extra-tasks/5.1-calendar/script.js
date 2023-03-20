function createCalendar(elem, year, month) {
  const days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
  const date = new Date(year, month - 1);

  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');

  days.forEach((day) => {
    const th = document.createElement('th');
    th.textContent = day;
    headRow.appendChild(th);
  });

  thead.append(headRow);

  const tbody = document.createElement('tbody');
  let bodyRows = '<tr>';

  for (let i = 0; i < date.getDay() - 1; i++) {
    bodyRows += '<td></td>';
  }

  while (date.getMonth() === month - 1) {
    bodyRows += `<td>${date.getDate()}</td>`;

    if (date.getDay() === 0) {
      bodyRows += '</tr><tr>';
    }

    date.setDate(date.getDate() + 1);
  }

  if (date.getDay() - 1 !== 0) {
    for (let i = date.getDay() - 1; i < 7; i++) {
      bodyRows += '<td></td>';
    }
  }

  bodyRows += '</tr>';
  tbody.innerHTML = bodyRows;
  table.append(thead, tbody);

  elem.append(table);
}

const cal = document.getElementById('cal');
createCalendar(cal, 2023, 2);
