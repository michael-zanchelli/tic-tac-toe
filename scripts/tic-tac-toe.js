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

  init() {
    this.#board = Array(3);
    for (let row = 0; row < this.#board.length; row++)
      this.#board[row] = Array(3);
  }

  /**
   * Mark cell on board with player (id), then check and return results:
   *  NO_WINNER_CONTINUE   : no winner yet, continue playing
   *  NO_WINNER_BOARD_FULL : no winner, board full
   *  'player'             : 'player' is winner
   */
  markAndCheck(row, col, player) {
    let winner;
    let winningCells = Array(this.#board.length);
    
    this.#board[row][col] = player;

    // Check each row for 'player' winning across
    // Also check for uninitialized cells
    for (let row = 0; row < this.#board.length; row++) {
      winner = true;
      for (let col = 0; col < this.#board[row].length; col++) {
        if (this.#board[row][col] == undefined) {
          return { status: TicTacToe.NO_WINNER_CONTINUE, winningCells: null };
        }
        else if (this.#board[row][col] != player) {
          winner = false;
          break;
        }
        else {
          // Add to list of winning cells
          winningCells.push( { row: row, column: col } );
        }
      }
      if (winner == true) {
        return { status: PLAYER_WINS, winningCells: winningCells };
      }
    }

    // Check each column for 'player' winning down
    for (let col = 0; col < this.#board.length; col++) {
      winner = true;
      for (let row = 0; row < this.#board[col].length; row++) {
        if (this.#board[row][col] != player) {
          winner = false;
          break;
        }
      }
      if (winner == true) {
        return { status: PLAYER_WINS, winningCells: winningCells };
      }
    }

    // Check for 'player' winning along upper-left to lower-right diagonal
    winner = true;
    for (let i = 0; i < this.#board.length; i++) {
      if (this.#board[i][i] != player) {
        winner = false;
        break;
      }
    }
    if (winner == true) {
      return { status: PLAYER_WINS, winningCells: winningCells };
    }

    // Check for 'player' winning along upper-right to lower-left diagonal
    winner = true;
    let column = this.#board.length - 1;
    for (let row = 0; row < this.#board.length; row++) {
      if (this.#board[row][column] != player) {
        winner = false;
        break;
      }
    }
    if (winner == true) {
      return { status: PLAYER_WINS, winningCells: winningCells };
    }

    return { status: TicTacToe.NO_WINNER_BOARD_FULL, winningCells: null };
  }

}