"use strict";

/**
 * Conway's Game Of Life (cellular automata)
 * 
 */
class TicTacToe {
  /** Statuses returned when checking board for a winner */
  static NO_WINNER_BOARD_FULL = -1;
  static NO_WINNER_CONTINUE = 0;
  static PLAYER_WINS = 1;

  /** Code indicating what type of winning path was found */
  static WINNING_ROW = 0;
  static WINNING_COLUMN = 1;
  static WINNING_DIAGONAL = 2;

  /** Mneumonics for player ids */
  static PLAYER1 = 1;
  static PLAYER2 = 2;

  /** Counters for # of marks in each row, each column and across diagonals for player1 & plaer2 */
  #rowCntsPlayer1;
  #rowCntsPlayer2;
  #colCntsPlayer1;
  #colCntsPlayer2;
  #diagCntsPlayer1;
  #diagCntsPlayer2;
  #totalCntPlayer1;
  #totalCntPlayer2;

  /** The board */
  #board;

  #log(str) {
    console.log(str);
  }

  init() {
    this.#board = Array(3);
    for (let row = 0; row < this.#board.length; row++)
      this.#board[row] = Array(3);

    this.#rowCntsPlayer1 = Array(3).fill(0);
    this.#rowCntsPlayer2 = Array(3).fill(0);
    this.#colCntsPlayer1 = Array(3).fill(0);
    this.#colCntsPlayer2 = Array(3).fill(0);
    this.#diagCntsPlayer1 = Array(3).fill(0);
    this.#diagCntsPlayer2 = Array(3).fill(0);
    this.#totalCntPlayer1 = 0;
    this.#totalCntPlayer2 = 0;
  }

  getCell(row, col) {
    return this.#board[row][col];
  }

  #incrementCounts(row, col, player) {
    if (player == TicTacToe.PLAYER1) {
      this.#rowCntsPlayer1[row]++;
      this.#colCntsPlayer1[col]++;
      this.#totalCntPlayer1++;
    }
    else {
      this.#rowCntsPlayer2[row]++;
      this.#colCntsPlayer2[col]++;
      this.#totalCntPlayer2++;
    }

    // Increment counts for diagonals for 'player''
    if ((row == 1) && (col == 1)) {
      // Cell (1, 1) is common to both diagonals
      if (player == TicTacToe.PLAYER1) {
        this.#diagCntsPlayer1[0]++;
        this.#diagCntsPlayer1[1]++;
      }
      else {
        this.#diagCntsPlayer2[0]++;
        this.#diagCntsPlayer2[1]++;
      }
    }
    else if (row == col) {
      // First diagonal ('0')
      if (player == TicTacToe.PLAYER1) {
        this.#diagCntsPlayer1[0]++;
      }
      else {
        this.#diagCntsPlayer2[0]++;
      }
    }
    else if (((row == 0) && (col == 2)) || ((row == 2) && (col == 0))) {
      // Second diagonal ('1'), uuper-right and lower left cells
      if (player == TicTacToe.PLAYER1) {
        this.#diagCntsPlayer1[1]++;
      }
      else {
        this.#diagCntsPlayer2[1]++;
      }
    }
  }

  /**
   * Mark the cell on the board, tally counts and return results.
   *   Tally row counts, column counts, diagonal counts and total counts for
   *   player1 & player2.
   *   Check for winner or full board and return results:
   *  NO_WINNER_CONTINUE   : no winner yet, continue playing
   *  NO_WINNER_BOARD_FULL : no winner, board full
   *  PLAYER_WINS          : 'player' is winner
   */
  markAndCheck(row, col, player) {
    this.#board[row][col] = player;  // Mark this cell with player id

    // Increment counts for row, column and totals for player1 & player2
    this.#incrementCounts(row, col, player);
    
    // Cannot have a winner if not enough turns played yet
    if (this.#totalCntPlayer1 > 2) {
      // Check for 'player' winning across any row
      for (let row = 0; row < 3; row++) {
        if (((player == TicTacToe.PLAYER1) & (this.#rowCntsPlayer1[row] == 3))
          || ((player == TicTacToe.PLAYER2) & (this.#rowCntsPlayer2[row] == 3))) {
          return { status: TicTacToe.PLAYER_WINS, winningPathType: TicTacToe.WINNING_ROW, winningPathValue: row };
        }
      }

      // Check for 'player' winning down any column
      for (let col = 0; col < 3; col++) {
        if (((player == TicTacToe.PLAYER1) & (this.#colCntsPlayer1[col] == 3))
          || ((player == TicTacToe.PLAYER2) & (this.#colCntsPlayer2[col] == 3))) {
          return { status: TicTacToe.PLAYER_WINS, winningPathType: TicTacToe.WINNING_COLUMN, winningPathValue: col };
        }
      }

      // Check for 'player' winning along either diagonal
      for (let indx = 0; indx < 2; indx++) {
        if (((player == TicTacToe.PLAYER1) & (this.#diagCntsPlayer1[0] == 3))
          || ((player == TicTacToe.PLAYER2) & (this.#diagCntsPlayer2[0] == 3))) {
          return { status: TicTacToe.PLAYER_WINS, winningPathType: TicTacToe.WINNING_DIAGONAL, winningPathValue: 1 };
        }
        else if (((player == TicTacToe.PLAYER1) & (this.#diagCntsPlayer1[1] == 3))
          || ((player == TicTacToe.PLAYER2) & (this.#diagCntsPlayer2[1] == 3))) {
          return { status: TicTacToe.PLAYER_WINS, winningPathType: TicTacToe.WINNING_DIAGONAL, winningPathValue: 2 };
        }
      }

      if ((this.#totalCntPlayer1 == 5) && (this.#totalCntPlayer2 == 4)) {
        // No winner and no empty cells: board is full
        return { status: TicTacToe.NO_WINNER_BOARD_FULL, winningPathType: null, winningPathValue: null };
      }
    }

    // Too few turns so far OR no winner and board is not full: game can continue
    return { status: TicTacToe.NO_WINNER_CONTINUE, winningPathType: null, winningPathValue: null };
  }

  #pickRandomCell() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 3);
      col = Math.floor(Math.random() * 3);
    } while (this.#board[row][col] != undefined)

    return { row: row, column: col };
  }

  /**
   * Determine next move based on some basic strategies.
   * 
   * Note player is always 2nd player (PLAYER2); 1st player's moves are made
   * interactively.
   */
  nextMove() {
    let secondDiagonalIndices = [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }];
    let row, col;

    // Check rows for a winning empty cell
    for (row = 0; row < 3; row++) {
      if ((this.#rowCntsPlayer2[row] == 2) && (this.#rowCntsPlayer1[row] == 0)) {
        for (col = 0; col < 3; col++) {
          if (this.#board[row][col] == undefined) {
            this.#log("Check rows: found winning empty cell at (" + row + ", " + col + ")");
            return { row: row, column: col };
          }
        }
      }
    }

    // Check columns for a winning empty cell
    for (col = 0; col < 3; col++) {
      if ((this.#colCntsPlayer2[col] == 2) && (this.#colCntsPlayer1[col] == 0)) {
        for (row = 0; row < 3; row++) {
          if (this.#board[row][col] == undefined) {
            this.#log("Check columns: found winning empty cell at (" + row + ", " + col + ")");
            return { row: row, column: col };
          }
        }
      }
    }

    // Check diagonals for a winning empty cell
    // Diagonal 1: upper-left to lower-right diagonal
    if ((this.#diagCntsPlayer2[0] == 2) && (this.#diagCntsPlayer1[0] == 0)) {
      for (let indx = 0; indx < this.#diagCntsPlayer2.length; indx++) {
        if (this.#board[indx][indx] == undefined) {
          this.#log("Check diagonals: found winning empty cell at (" + indx + ", " + indx + ")");
          return { row: indx, column: indx };
        }
      }
    }
    // Diagonal 2: Upper-right to lower-left diagonal
    else if ((this.#diagCntsPlayer2[1] == 2) && (this.#diagCntsPlayer1[1] == 0)) {
      for (let cell of secondDiagonalIndices) {
        if (this.#board[cell.row][cell.col] == undefined) {
          this.#log("Check diagonals: found winning empty cell at (" + cell.row + ", " + cell.col + ")");
          return { row: cell.row, column: cell.col };
        }
      }
    }

    // Check rows for a cell to block other player
    for (row = 0; row < 3; row++) {
      if ((this.#rowCntsPlayer1[row] == 2) && (this.#rowCntsPlayer2[row] == 0)) {
        for (col = 0; col < 3; col++) {
          if (this.#board[row][col] == undefined) {
            this.#log("Check rows: found blocking cell at (" + row + ", " + col + ")");
            return { row: row, column: col };
          }
        }
      }
    }

    // Check columns for a cell to block other player
    for (col = 0; col < 3; col++) {
      if ((this.#colCntsPlayer1[col] == 2) && (this.#colCntsPlayer2[col] == 0)) {
        for (row = 0; row < 3; row++) {
          if (this.#board[row][col] == undefined) {
            this.#log("Check columns: found blocking cell at (" + row + ", " + col + ")");
            return { row: row, column: col };
          }
        }
      }
    }

    // Check diagonals for a cell to block other player
    // Upper-left to lower-right diagonal
    if ((this.#diagCntsPlayer1[0] == 2) && (this.#diagCntsPlayer2[0] == 0)) {
      for (let indx = 0; indx < this.#diagCntsPlayer2.length; indx++) {
        if (this.#board[indx][indx] == undefined) {
          this.#log("Check diagonal 1: found blocking cell at (" + indx + ", " + indx + ")");
          return { row: indx, column: indx };
        }
      }
    }
    // Upper-right to lower-left diagonal
    else if ((this.#diagCntsPlayer1[1] == 2) && (this.#diagCntsPlayer2[1] == 0)) {
      for (let cell of secondDiagonalIndices) {
        if (this.#board[cell.row][cell.col] == undefined) {
          this.#log("Check diagonal 2: found blocking cell at (" + cell.row + ", " + cell.col + ")");
          return { row: cell.row, column: cell.col };
        }
      }
    }

    // No good moves found; pick a random cell
    return this.#pickRandomCell();
  }

}