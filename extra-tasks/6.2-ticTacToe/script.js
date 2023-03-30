const area = document.getElementById('area');

let board = [];
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

const fields = document.querySelectorAll('.field');

document.getElementById('restart').addEventListener('click', startGame);

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
  if (typeof board[event.target.id] === 'number') {
    turn(event.target.id, huPlayer);

    if (!checkWin(board, huPlayer) && !checkTie()) {
      turn(bestSpot(), aiPlayer);
    }
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
  let plays = board.reduce((acc, cur, i) => (cur === player ? acc.concat(i) : acc), []);

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
  for (let index of winCombos[gameWon.index]) {
    document
      .getElementById(index)
      .classList.add(`${gameWon.player == huPlayer ? 'x-win' : 'o-win'}`);
  }

  area.removeEventListener('click', turnClick);

  declareWinner(gameWon.player === huPlayer ? 'You win!' : 'You lose.');
}

function declareWinner(winner) {
  document.getElementById('results').style.display = 'block';
  document.getElementById('text').textContent = winner;
}

function emptySquares() {
  return board.filter((field) => typeof field === 'number');
}

function bestSpot() {
  return minimax(board, aiPlayer).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    fields.forEach((field) => {
      field.classList.add('tie');
    });

    declareWinner('Tie Game!');

    return true;
  }
  return false;
}

function minimax(newBoard, player) {
  let availSpots = emptySquares();

  if (checkWin(newBoard, huPlayer)) {
    return { score: -10 };
  } else if (checkWin(newBoard, aiPlayer)) {
    return { score: 10 };
  } else if (availSpots.length === 0) {
    return { score: 0 };
  }

  let moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = newBoard[availSpots[i]];
    newBoard[availSpots[i]] = player;

    if (player == aiPlayer) {
      let result = minimax(newBoard, huPlayer);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, aiPlayer);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = move.index;

    moves.push(move);
  }

  let bestMove;
  if (player === aiPlayer) {
    let bestScore = -10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = 10000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}
