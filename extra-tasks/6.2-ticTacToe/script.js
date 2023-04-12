const area = document.getElementById('area');
const fields = document.querySelectorAll('.field');
const huPlayer = 'X';
const aiPlayer = 'O';
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let board = [];

startGame();

function startGame() {
  document.querySelector('.results').style.display = 'none';
  board = Array.from(Array(9).keys());
  area.addEventListener('click', turnClick);

  fields.forEach((field) => {
    field.textContent = '';
    field.classList.remove('x', 'o', 'x-win', 'o-win', 'tie');
  });
}

function turnClick(event) {
  if (event.target.innerHTML) {
    return;
  }

  turn(event.target.id, huPlayer);

  if (!checkWin(board, huPlayer) && !checkTie()) {
    turn(aiSpot(), aiPlayer);
  }
}

function turn(fieldId, player) {
  board[fieldId] = player;
  document.getElementById(fieldId).textContent = player;
  document.getElementById(fieldId).classList.add(`${player.toLowerCase()}`);

  let gameWon = checkWin(board, player);

  if (gameWon) {
    gameOver(gameWon);
  }
}

function checkWin(board, player) {
  const plays = board.reduce((acc, cur, i) => (cur === player ? acc.concat(i) : acc), []);
  let gameWon = null;

  for (let [index, win] of winCombos.entries()) {
    if (win.every((elem) => plays.includes(elem))) {
      gameWon = { index: index, player: player };
      break;
    }
  }

  return gameWon;
}

function gameOver(gameWon) {
  const humanWinCount = document.getElementById('humanWinCount');
  const aiWinCount = document.getElementById('aiWinCount');

  winCombos[gameWon.index].forEach((index) => {
    document
      .getElementById(index)
      .classList.add(`${gameWon.player == huPlayer ? 'x-win' : 'o-win'}`);
  });

  if (gameWon.player === huPlayer) {
    humanWinCount.innerHTML = Number(humanWinCount.innerHTML) + 1;
  }

  if (gameWon.player === aiPlayer) {
    aiWinCount.innerHTML = Number(aiWinCount.innerHTML) + 1;
  }

  area.removeEventListener('click', turnClick);

  declareWinner(gameWon.player === huPlayer ? 'You win!' : 'You lose.');
}

function declareWinner(winner) {
  document.getElementById('results').style.display = 'flex';
  document.getElementById('text').textContent = winner;
}

function emptySquares() {
  return board.filter((field) => typeof field === 'number');
}

function checkTie() {
  if (emptySquares().length === 0) {
    fields.forEach((field) => {
      field.classList.add('tie');
    });

    document.getElementById('tieCount').innerHTML =
      Number(document.getElementById('tieCount').innerHTML) + 1;

    declareWinner('Tie Game!');

    return true;
  }

  return false;
}

function aiSpot() {
  const availSpots = emptySquares();
  return availSpots[Math.floor(Math.random() * availSpots.length)];
}

document.getElementById('restart').addEventListener('click', startGame);
