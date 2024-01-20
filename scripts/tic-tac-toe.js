"use strict";

/**
 * Conway's Game Of Life (cellular automata)
 * 
 */
class TicTacToe {
  static NO_WINNER_BOARD_FULL = -1;
  static NO_WINNER_CONTINUE = 0;
  static PLAYER_WINS = 1;

  #board;

  #log(str) {
    console.log(str);
  }

  init() {
    this.#board = Array(3);
    for (let row = 0; row < this.#board.length; row++)
      this.#board[row] = Array(3);
  }

  getCell(row, col) {
    return this.#board[row][col];
  }

  /**
   * Mark cell on board with player (id), then check and return results:
   *  NO_WINNER_CONTINUE   : no winner yet, continue playing
   *  NO_WINNER_BOARD_FULL : no winner, board full
   *  PLAYER_WINS          : 'player' is winner
   */
  markAndCheck(row, col, player) {
    let winner;
    let winningCells = Array(this.#board.length);

    this.#board[row][col] = player;  // Mark this cell with player id

    // Check each row for 'player' winning across
    // Also check for uninitialized cells
    this.#log("row check");
    for (let row = 0; row < this.#board.length; row++) {
      winner = true;
      for (let col = 0; col < this.#board[row].length; col++) {
        if (this.#board[row][col] == player) {
          // Add to list of winning cells
          winningCells.push({ row: row, column: col });
        }
        else {
          winner = false;
          break;
        }
      }
      if (winner == true) {
        return { status: TicTacToe.PLAYER_WINS, winningCells: winningCells };
      }
    }

    // Check each column for 'player' winning down
    this.#log("column check");
    winningCells.length = 0;
    for (let col = 0; col < this.#board.length; col++) {
      winner = true;
      for (let row = 0; row < this.#board[col].length; row++) {
        if (this.#board[row][col] == player) {
          // Add to list of winning cells
          winningCells.push({ row: row, column: col });
        }
        else {
          winner = false;
          break;
        }
      }
      if (winner == true) {
        return { status: TicTacToe.PLAYER_WINS, winningCells: winningCells };
      }
    }

    // Check for 'player' winning along upper-left to lower-right diagonal
    this.#log("diagonal1 check");
    winningCells.length = 0;
    winner = true;
    for (let indx = 0; indx < this.#board.length; indx++) {
      if (this.#board[indx][indx] == player) {
        // Add to list of winning cells
        winningCells.push({ row: indx, column: indx });
      }
      else {
        winner = false;
        break;
      }
    }
    if (winner == true) {
      return { status: TicTacToe.PLAYER_WINS, winningCells: winningCells };
    }

    // Check for 'player' winning along upper-right to lower-left diagonal
    this.#log("diagonal2 check");
    winningCells.length = 0;
    winner = true;
    let column = this.#board.length - 1;
    for (let row = 0; row < this.#board.length; row++) {
      if (this.#board[row][column] == player) {
        // Add to list of winning cells
        winningCells.push({ row: row, column: column });
      }
      else {
        winner = false;
        break;
      }
      column--;
    }
    if (winner == true) {
      return { status: TicTacToe.PLAYER_WINS, winningCells: winningCells };
    }

    // Finally, check for uninitialized cells. If found, game can continue
    this.#log("uninitialized cell check");
    for (let row = 0; row < this.#board.length; row++) {
      for (let col = 0; col < this.#board[row].length; col++) {
        if (this.#board[row][col] == undefined) {
          return { status: TicTacToe.NO_WINNER_CONTINUE, winningCells: null };
        }
      }
    }

    // No winner and no empty cells: board is full
    return { status: TicTacToe.NO_WINNER_BOARD_FULL, winningCells: null };
  }

  #pickRandomCell() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (this.#board[row][col] != undefined)

    return { row: row, column: col };
  }

  nextMove() {
    return this.#pickRandomCell();
  }

}