const area = document.getElementById('area');
const boxes = document.querySelectorAll('.box');

let moveCount = 0;

boxes.forEach((box) =>
  box.addEventListener('click', (event) => {
    event.target.textContent = 'X';
  }),
);
