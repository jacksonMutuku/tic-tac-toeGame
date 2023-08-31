// Module for game board
const gameBoard = (() => {
    const board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const updateCell = (index, player) => {
      if (board[index] === "") {
        board[index] = player.getSymbol();
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    };
  
    return { getBoard, updateCell, resetBoard };
  })();
  
  // Factory function for players
  const createPlayer = (name, symbol) => {
    const getSymbol = () => symbol;
    return { name, getSymbol };
  };
  
  // Module for controlling the game flow
  const gameController = (() => {
    const playerX = createPlayer("Player X", "X");
    const playerO = createPlayer("Player O", "O");
    let currentPlayer = playerX;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === playerX ? playerO : playerX;
    };
  
    const playRound = (cellIndex) => {
      if (gameBoard.updateCell(cellIndex, currentPlayer)) {
        switchPlayer();
        return true;
      }
      return false;
    };
  
    const checkWinner = () => {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
  
      const board = gameBoard.getBoard();
  
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
  
      if (board.every(cell => cell !== "")) {
        return "draw";
      }
  
      return null;
    };
  
    const resetGame = () => {
      gameBoard.resetBoard();
      currentPlayer = playerX;
    };
  
    return { playRound, checkWinner, resetGame };
  })();
  
  // UI interaction
  document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
  
    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => {
        if (gameController.checkWinner() || gameBoard.getBoard()[index] !== "") {
          return;
        }
  
        if (gameController.playRound(index)) {
          updateUI();
          const winner = gameController.checkWinner();
          if (winner) {
            setTimeout(() => {
              if (winner === "draw") {
                alert("It's a draw!");
              } else {
                alert(`${winner.name} wins!`);
              }
              gameController.resetGame();
              updateUI();
            }, 100);
          }

          
        }
      });
    });
  
    const updateUI = () => {
      const board = gameBoard.getBoard();
      cells.forEach((cell, index) => {
        cell.textContent = board[index];
      });
    };
  
    updateUI();
  });
  