window.onload = function () {
  const NUM_SQUARES = 9;
  const playerOne = "X";
  const playerTwo = "O";
  let currentPlayer = decideStartingPlayer();
  let gameOver = false;

  /**
     * Function determines who goes first in the game. Cannot use an arrow
     * function if the function is called prior to its declaration.
     *
     * @returns Player who will go first.
     */
  function decideStartingPlayer() {
    let flipACoin = Math.floor(Math.random() * 2) + 1;
    return flipACoin === 1
      ? playerOne
      : playerTwo;
  }

  /**
     * Function displays current player in the "Player's Turn" box in browser.
     */
  displayCurrentPlayer = () => {
    document.getElementById("player-turn").innerHTML = currentPlayer;
  };

  /**
     * Function draws the gameboard and listens for player clicks on squares.
     * Game continues as long as gameOver remains false.
     */
  gameLoop = () => {
    document.getElementById("winner").innerHTML = "";
    for (i = 0; i < NUM_SQUARES; i++) {
      id = "sq" + i;
      let gameSquare = document.createElement("div");
      gameSquare.id = id;
      gameSquare.className = "square";
      document.getElementById("gameboard").appendChild(gameSquare);
      gameSquare.addEventListener("click", markSquare);
      displayCurrentPlayer();
      gameOver = false;
    }
  };

  /**
     * Function listens for a player to click a square. Once clicked, the appropriate
     * player's X or O is placed in the square. A winner condition is checked,
     * and if no winner, play toggles to the other player. Finally, the "Player's Turn"
     * box is updated with the new current player.
     */
  markSquare = event => {
    if (event.target.innerHTML === "" && !gameOver) {
      event.target.innerHTML = currentPlayer;
      checkForWinner();
      togglePlayer();
    }
    displayCurrentPlayer();
  };

  /**
     * Function toggles play between player one and player two.
     */
  togglePlayer = () => {
    currentPlayer = currentPlayer === playerOne
      ? playerTwo
      : playerOne;
  };

  /**
     * Function checks all squares for a win state. If there is a winner, it is
     * displayed in the brower. If there is a stalemate, that is also displayed.
     * Otherwise, play continues until one of those conditions is met.
     */
  checkForWinner = () => {
    let squares = document.querySelectorAll(".square");
    let board = Array.from(squares).map(
      square => square.innerHTML === ""
      ? "-"
      : square.innerHTML);

    let winConditions = [
      board.slice(0, 3).join(""),
      board.slice(3, 6).join(""),
      board.slice(6, 9).join(""),
      board[0] + board[3] + board[6],
      board[1] + board[4] + board[7],
      board[2] + board[5] + board[8],
      board[0] + board[4] + board[8],
      board[2] + board[4] + board[6]
    ];

    let winner = false;

    // Could use 'find', but chose loop since that was this week's lesson
    for (let i = 0; i < winConditions.length; i++) {
      if (winConditions[i] === "XXX" || winConditions[i] === "OOO") {
        winner = true;
        // If - found, then exit the loop. No further checking needed.
        break;
      }
    }

    if (winner) {
      document.getElementById("winner").innerText = currentPlayer + " wins!";
      gameOver = true;
    }

    let noWinner = true;

    // Could also use 'include' but we didn't cover that yet.
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "-") {
        noWinner = false;
        break;
      }
    }

    if (noWinner) {
      document.getElementById("winner").innerText = "Stalemate!";
      gameOver = true;
    }
  };

  /**
     * Function allows the user to press a button, clear the board, and restart
     * the game.
     */
  startGameOver = () => {
    document.getElementById("gameboard").innerHTML = "";
    currentPlayer = decideStartingPlayer();
    gameLoop();
  };

  gameLoop();
};
