class ErrorView {
  constructor(parentId) {
    this.root = document.getElementById(parentId);
  }

  render(message) {
    const container = DomHelper.createNode('section', ['error-section']);

    container.innerHTML = `
    <h2 class="error-header">Sorry, something went wrong...</h2>
    <p class="error-text">Ooops... ${message}.</p>
    <button class="btn secondary-btn" id="errorBtn">BACK TO MAIN</button>

    <section class="game-section">
      <div id="area">
        <div class="field" id="0"></div>
        <div class="field" id="1"></div>
        <div class="field" id="2"></div>
        <div class="field" id="3"></div>
        <div class="field" id="4"></div>
        <div class="field" id="5"></div>
        <div class="field" id="6"></div>
        <div class="field" id="7"></div>
        <div class="field" id="8"></div>
      </div>
      <div class="results" id="results">
        <span class="text" id="text"></span>
        <div class="score">
          <p>You: <span id="humanWinCount">0</span> - Tie: <span id="tieCount">0</span> - AI: <span
              id="aiWinCount">0</span></p>
        </div>
        <button class="btn" id="restart">RESTART GAME</button>
      </div>
    </section>
    `;

    return container;
  }

  game() {
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

    function checkWin(boardElems, player) {
      const plays = boardElems.reduce((acc, cur, i) => (cur === player ? acc.concat(i) : acc), []);
      let gameWon = null;

      // eslint-disable-next-line no-restricted-syntax
      for (const [index, win] of winCombos.entries()) {
        if (win.every((elem) => plays.includes(elem))) {
          gameWon = { index, player };
          break;
        }
      }

      return gameWon;
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

        document.getElementById('tieCount').innerHTML = Number(document.getElementById('tieCount').innerHTML) + 1;

        declareWinner('Tie Game!');

        return true;
      }

      return false;
    }

    function turn(fieldId, player) {
      board[fieldId] = player;
      document.getElementById(fieldId).textContent = player;
      document.getElementById(fieldId).classList.add(`${player.toLowerCase()}`);

      const gameWon = checkWin(board, player);

      if (gameWon) {
        // eslint-disable-next-line no-use-before-define
        gameOver(gameWon);
      }
    }

    function aiSpot() {
      const availSpots = emptySquares();
      return availSpots[Math.floor(Math.random() * availSpots.length)];
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

    function gameOver(gameWon) {
      const humanWinCount = document.getElementById('humanWinCount');
      const aiWinCount = document.getElementById('aiWinCount');

      winCombos[gameWon.index].forEach((index) => {
        document
          .getElementById(index)
          .classList.add(`${gameWon.player === huPlayer ? 'x-win' : 'o-win'}`);
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

    function startGame() {
      document.querySelector('.results').style.display = 'none';
      board = Array.from(Array(9).keys());
      area.addEventListener('click', turnClick);

      fields.forEach((elem) => {
        const field = elem;
        field.textContent = '';
        field.classList.remove('x', 'o', 'x-win', 'o-win', 'tie');
      });
    }

    startGame();

    document.getElementById('restart').addEventListener('click', startGame);
  }

  display(message) {
    try {
      this.root.append(this.render(message));
      this.game();
    } catch (err) {
      console.error(err.message);
    }
  }
}
