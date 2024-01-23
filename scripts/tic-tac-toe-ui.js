
/**
 * Tic Tac Toe game UI
 */

class TicTacToeUI {
  #ticTacToe; /** The handle to the TicTacToe class object */

  #canvasCtx; /** The canvas context used to draw the Tic Tac Toe board */

  #newGameButton; /** New Game button */

  static #LINE_WIDTH = 5;
  static #CELL_MARGIN = 15;
  static #CELL_DRAW_SIZE = 50;
  static #CELL_SIZE = TicTacToeUI.#CELL_DRAW_SIZE + 2 * TicTacToeUI.#CELL_MARGIN;
  static #BOARD_SIZE = 3 * TicTacToeUI.#CELL_SIZE;

  /** Constructor
   * Note: this is called after page DOM is full loaded
   */
  constructor() {
    this.#newGameButton = document.querySelector("div#ticTacToe #newGameButton");

    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();

    this.#ticTacToe = new TicTacToe();  // Create instance of TicTacToe class
    this.#ticTacToe.init();

    this.#initBoard(document.querySelector("div#ticTacToe #board"));
  }

  #initBoard(board) {
    /* Initialize board size */
    board.width = board.height = TicTacToeUI.#BOARD_SIZE;

    this.#canvasCtx = board.getContext("2d");

    this.#drawBoard();
    
    // Add event Handler
    board.onclick = (event) => this.boardClickHandler(event);
  }

  #drawBoard() {
    this.#canvasCtx.lineWidth = TicTacToeUI.#LINE_WIDTH;
    this.#canvasCtx.strokeStyle = "darkgray";

    this.#canvasCtx.beginPath();

    // Draw vertical lines
    for (let x = TicTacToeUI.#CELL_SIZE - 1; x < TicTacToeUI.#BOARD_SIZE - 1; x += TicTacToeUI.#CELL_SIZE) {
      this.#canvasCtx.moveTo(x, 0);
      this.#canvasCtx.lineTo(x, TicTacToeUI.#BOARD_SIZE - 1);
    }

    // Draw horizontal lines
    for (let y = TicTacToeUI.#CELL_SIZE - 1; y < TicTacToeUI.#BOARD_SIZE - 1; y += TicTacToeUI.#CELL_SIZE) {
      this.#canvasCtx.moveTo(0, y);
      this.#canvasCtx.lineTo(TicTacToeUI.#BOARD_SIZE - 1, y);
    }

    this.#canvasCtx.stroke();
  }

  #redrawBoard() {
    this.#canvasCtx.clearRect(0, 0, this.#canvasCtx.canvas.width, this.#canvasCtx.canvas.height);
    this.#drawBoard();
  }

  #drawCell(row, col, player) {
    let x, y;

    this.#canvasCtx.strokeStyle = "black";
    this.#canvasCtx.beginPath();

    if (player == TicTacToe.PLAYER1) { // user = player '1' = X
      // First, draw line from upper-left to lower-right
      x = (col * TicTacToeUI.#CELL_SIZE) + TicTacToeUI.#CELL_MARGIN;
      y = (row * TicTacToeUI.#CELL_SIZE) + TicTacToeUI.#CELL_MARGIN;
      this.#canvasCtx.moveTo(x, y);
      this.#canvasCtx.lineTo(x + TicTacToeUI.#CELL_DRAW_SIZE, y + TicTacToeUI.#CELL_DRAW_SIZE);

      // Then, draw line from upper-right to lower-left
      x = (col * TicTacToeUI.#CELL_SIZE) + TicTacToeUI.#CELL_MARGIN + TicTacToeUI.#CELL_DRAW_SIZE;
      this.#canvasCtx.moveTo(x, y);
      this.#canvasCtx.lineTo(x - TicTacToeUI.#CELL_DRAW_SIZE, y + TicTacToeUI.#CELL_DRAW_SIZE);
    }
    else {  // player '2' = O
      x = (col * TicTacToeUI.#CELL_SIZE) + TicTacToeUI.#CELL_MARGIN + (TicTacToeUI.#CELL_DRAW_SIZE / 2);
      y = (row * TicTacToeUI.#CELL_SIZE) + TicTacToeUI.#CELL_MARGIN + (TicTacToeUI.#CELL_DRAW_SIZE / 2);
      this.#canvasCtx.arc(x, y, TicTacToeUI.#CELL_DRAW_SIZE / 2, 0, 2 * Math.PI);
    }
    this.#canvasCtx.stroke();
  }

  /** ourTurn
   * Computer takes a turn
   */
  ourTurn() {
    let result = this.#ticTacToe.nextMove();
    this.#processTurn(result.row, result.column, TicTacToe.PLAYER2);
  }

  #drawWinningPath(winningPathType, winningPathValue) {
    console.log("winningPathType=" + winningPathType + ", winningPathValue=" + winningPathValue);
    let x, y;

    this.#canvasCtx.strokeStyle = "darkgray";
    this.#canvasCtx.beginPath();

    switch (winningPathType) {
      case TicTacToe.WINNING_ROW:
        y = Math.floor( (winningPathValue + 0.5) * TicTacToeUI.#CELL_SIZE );
        this.#canvasCtx.moveTo(0, y);
        this.#canvasCtx.lineTo(TicTacToeUI.#BOARD_SIZE - 1, y);
        break;
    
      case TicTacToe.WINNING_COLUMN:
        x = Math.floor( (winningPathValue + 0.5) * TicTacToeUI.#CELL_SIZE );
        this.#canvasCtx.moveTo(x, 0);
        this.#canvasCtx.lineTo(x, TicTacToeUI.#BOARD_SIZE - 1);
        break;

      case TicTacToe.WINNING_DIAGONAL:
        switch (winningPathValue) {
          case 1:
            this.#canvasCtx.moveTo(0, 0);
            this.#canvasCtx.lineTo(TicTacToeUI.#BOARD_SIZE - 1, TicTacToeUI.#BOARD_SIZE - 1);
            break;

          case 2:
            this.#canvasCtx.moveTo(TicTacToeUI.#BOARD_SIZE - 1, 0);
            this.#canvasCtx.lineTo(0, TicTacToeUI.#BOARD_SIZE - 1);
            break;

          default:
            break;
        }  
        break;

      default:
        break;
    }
    
    this.#canvasCtx.stroke();
  }

  #processWin(result) {
    // display banner

    // draw winning path
    this.#drawWinningPath(result.winningPathType, result.winningPathValue);
  }

  #processDraw() {
    // display banner

  }

  #processTurn(row, col, player) {
    console.log("row=" + row + ", column=" + col + ", player=" + player);

    this.#drawCell(row, col, player);

    // Mark this cell with player id
    let result = this.#ticTacToe.markAndCheck(row, col, player);
    console.log("result=" + result.status);

    switch (result.status) {
      case TicTacToe.PLAYER_WINS: // 'player' wins
        this.#processWin(result);
        break;

      case TicTacToe.NO_WINNER_CONTINUE:
        if (player == TicTacToe.PLAYER1) {  // user is player '1'
          setTimeout(() => this.ourTurn());
        }
        else {
          this.#canvasCtx.canvas.inert = false;
        }
        break;

      case TicTacToe.NO_WINNER_BOARD_FULL: // game over; no winner
        this.#processDraw();
        break;

      default:
        break;
    }
  }

  /** Handle New Game button click */
  newGameButtonClickHandler() {
    this.#ticTacToe.init();
    this.#redrawBoard();
    this.#canvasCtx.canvas.inert = false;
  }

  boardClickHandler(event) {
    let row = Math.floor(event.offsetY / TicTacToeUI.#CELL_SIZE);
    let col = Math.floor(event.offsetX / TicTacToeUI.#CELL_SIZE);

    if (this.#ticTacToe.getCell(row, col) == undefined) {
      event.target.inert = true;
      this.#processTurn(row, col, TicTacToe.PLAYER1); // user is player '1'      
    }
  }

}

/* When page DOM is fully loaded, create an instance of the TicTacToeUI class */
window.onload = () => {
  let ticTacToeUI = new TicTacToeUI();
}