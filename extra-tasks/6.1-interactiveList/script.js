function createListContent(list) {
  let listContent = '';

  list.forEach((el) => {
    listContent += `<li>${el.value}</li>`;

    if (!el.children) {
      return el.value;
    }

    listContent += createListContent(el.children);
  });

  return `<ul id="ul">${listContent}</ul>`;
}

function createList(title, list) {
  document.body.innerHTML = `<h2>${title}</h2>${createListContent(list)}`;
}

//

const list = [
  {
    value: 'Пункт 1.',
    children: null,
  },
  {
    value: 'Пункт 2.',
    children: [
      {
        value: 'Подпункт 2.1.',
        children: null,
      },
      {
        value: 'Подпункт 2.2.',
        children: [
          {
            value: 'Подпункт 2.2.1.',
            children: null,
          },
          {
            value: 'Подпункт 2.2.2.',
            children: null,
          },
        ],
      },
      {
        value: 'Подпункт 2.3.',
        children: null,
      },
    ],
  },
  {
    value: 'Пункт 3.',
    children: null,
  },
];

createList('TEST TITLE', list);

document.getElementById('ul').addEventListener('click', (event) => {
  if (event.target.nextSibling?.tagName === 'UL') {
    event.target.nextSibling.classList.toggle('hidden');
  }
});
