window.onload = function () {
  const NUM_SQUARES = 9;
  const playerOne = "X";
  const playerTwo = "O";
  let currentPlayer = decideStartingPlayer();

  /**
     * Method determines who goes first in the game. Cannot use an arrow
     * function if the function is called prior to its declaration.
     *
     * @returns Player who will go first.
     */
  function decideStartingPlayer() {
    let flipACoin = Math.floor(Math.random() * 2) + 1;
    let whoGoesFirst = flipACoin === 1
      ? playerOne
      : playerTwo;
    return whoGoesFirst;
  }

  displayCurrentPlayer = () => {
    document.getElementById("player-turn").innerHTML = currentPlayer;
  };

  gameLoop = () => {
    // Draw the gameboard and listen for player clicks on squares
    for (i = 0; i < NUM_SQUARES; i++) {
      id = "sq" + i;
      let gameSquare = document.createElement("div");
      gameSquare.id = id;
      gameSquare.className = "square";
      document.getElementById("gameboard").appendChild(gameSquare);
      gameSquare.addEventListener("click", markSquare);
      displayCurrentPlayer();
    }
  };

  markSquare = event => {
    if (event.target.innerHTML === "") {
      event.target.innerHTML = currentPlayer;
      // Acts as a toggle between player 1 and player 2.
      // Can be written as a ternary, but personally find that harder to read
      // in this instance.
      if (currentPlayer === playerOne) {
        currentPlayer = playerTwo;
      } else {
        currentPlayer = playerOne;
      }
    }
    displayCurrentPlayer();
  };

  gameLoop();
};
