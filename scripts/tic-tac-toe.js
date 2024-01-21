"use strict";

/**
 * Conway's Game Of Life (cellular automata)
 * 
 */
class TicTacToe {
  static NO_WINNER_BOARD_FULL = -1;
  static NO_WINNER_CONTINUE = 0;
  static PLAYER_WINS = 1;

  static WINNER_ROW = 0;
  static WINNER_COLUMN = 1;
  static WINNER_DIAGONAL = 2;

  #board;

  #log(str) {
    // console.log(str);
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

    this.#board[row][col] = player;  // Mark this cell with player id

    // Check each row for 'player' winning across
    this.#log("row check");
    for (let row = 0; row < this.#board.length; row++) {
      winner = true;
      for (let col = 0; col < this.#board[row].length; col++) {
        if (this.#board[row][col] == player) {
          continue;
        }
        winner = false;
        break;
      }
      if (winner == true) {
        return { status: TicTacToe.PLAYER_WINS, winnerPath: TicTacToe.WINNER_ROW, winnerVal: row };
      }
    }

    // Check each column for 'player' winning down
    this.#log("column check");
    for (let col = 0; col < this.#board.length; col++) {
      winner = true;
      for (let row = 0; row < this.#board[col].length; row++) {
        if (this.#board[row][col] == player) {
          continue;
        }
        winner = false;
        break;
      }
      if (winner == true) {
        return { status: TicTacToe.PLAYER_WINS, winnerPath: TicTacToe.WINNER_COLUMN, winnerVal: col };
      }
    }

    // Check for 'player' winning along upper-left to lower-right diagonal
    this.#log("diagonal1 check");
    winner = true;
    for (let indx = 0; indx < this.#board.length; indx++) {
      if (this.#board[indx][indx] == player) {
        continue;
      }
      winner = false;
      break;
    }
    if (winner == true) {
      return { status: TicTacToe.PLAYER_WINS, winnerPath: TicTacToe.WINNER_DIAGONAL, winnerVal: 1 };
    }

    // Check for 'player' winning along upper-right to lower-left diagonal
    this.#log("diagonal2 check");
    winner = true;
    let column = this.#board.length - 1;
    for (let row = 0; row < this.#board.length; row++) {
      let val = this.#board[row][column];
      column--;
      if (val == player) {
        continue;
      }
      winner = false;
      break;
    }
    if (winner == true) {
      return { status: TicTacToe.PLAYER_WINS, winnerPath: TicTacToe.WINNER_DIAGONAL, winnerVal: 2 };
    }

    // Finally, check for uninitialized cells. If found, game can continue
    this.#log("uninitialized cell check");
    for (let row = 0; row < this.#board.length; row++) {
      for (let col = 0; col < this.#board[row].length; col++) {
        if (this.#board[row][col] == undefined) {
          return { status: TicTacToe.NO_WINNER_CONTINUE, winnerPath: null, winnerVal: null };
        }
      }
    }

    // No winner and no empty cells: board is full
    return { status: TicTacToe.NO_WINNER_BOARD_FULL, winnerPath: null, winnerVal: null };
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