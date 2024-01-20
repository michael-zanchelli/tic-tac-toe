
/**
 * Tic Tac Toe game UI
 */

class TicTacToeUI {
  #ticTacToe; /** The handle to the TicTacToe class object */

  #canvasCtx; /** The canvas context used to draw the Tic Tac Toe board curve */

  #newGameButton; /** New Game button */

  static #LINE_WIDTH = 5;
  static #CELL_MARGIN = 10;
  static #CELL_DRAW_SIZE = 60;
  static #CELL_SIZE = TicTacToeUI.#CELL_DRAW_SIZE + 2 * TicTacToeUI.#CELL_MARGIN;
  static #BOARD_SIZE = 3 * TicTacToeUI.#CELL_SIZE + 2 * TicTacToeUI.#LINE_WIDTH;

  /** Constructor
   * Note: this is called after page DOM is full loaded
   */
  constructor() {
    this.#newGameButton = document.querySelector("div#ticTacToe #newGameButton");

    this.#newGameButton.onclick = () => this.newGameButtonClickHandler();

    this.#ticTacToe = new TicTacToe();  // Create instance of TicTacToe class
    this.#ticTacToe.init();

    this.#initBoard( document.querySelector("div#ticTacToe #board") );
  }

  #initBoard(board) {
    /* Initialize board size */
    board.width = board.height = TicTacToeUI.#BOARD_SIZE;

    this.#canvasCtx = board.getContext("2d");
    this.#canvasCtx.lineWidth = TicTacToeUI.#LINE_WIDTH;

    this.#canvasCtx.beginPath();

    // Draw vertical lines
    for (let x = TicTacToeUI.#CELL_SIZE - 1; x < TicTacToeUI.#BOARD_SIZE - 1; x += TicTacToeUI.#CELL_SIZE + TicTacToeUI.#LINE_WIDTH)
    {
      this.#canvasCtx.moveTo(x, 0);
      this.#canvasCtx.lineTo(x, TicTacToeUI.#BOARD_SIZE - 1);
    }

    // Draw horizontal lines
    for (let y = TicTacToeUI.#CELL_SIZE - 1; y < TicTacToeUI.#BOARD_SIZE - 1; y += TicTacToeUI.#CELL_SIZE + TicTacToeUI.#LINE_WIDTH)
    {
      this.#canvasCtx.moveTo(0, y);
      this.#canvasCtx.lineTo(TicTacToeUI.#BOARD_SIZE - 1, y);
    }

    this.#canvasCtx.stroke();

    // Add event Handler
    board.onclick = (event) => this.boardClickHandler(event);
  }

  /** ourTurn
   * Computer takes a turn
   */
  async ourTurn() {
    let result = { row: 0, column: 0 };
    this.#processTurn(result.row, result.column, 2); // We're player '2'
  }

  #processTurn(row, col, player) {
    console.log("row=" + row + ", column=" + col + ", player=" + player);

    // Mark this cell with player id
    let result = this.#ticTacToe.markAndCheck(row, col, player);

    switch (result.status) {
      case player:
        // 'player' wins
        break;
    
        case TicTacToe.NO_WINNER_CONTINUE:
          if (player == 1) {
            this.ourTurn();
          }
        break;
    
        case TicTacToe.NO_WINNER_BOARD_FULL:
          // game over; no winner
        break;

      default:
        break;
    }
  }

  /** Handle New Game button click */
  newGameButtonClickHandler() {
  }

  boardClickHandler(event) {
    console.log("clientX=" + event.clientX + ", clientY=" + event.clientY);
    console.log("offsetX=" + event.offsetX + ", offsetY=" + event.offsetY);
    let row = Math.floor(event.offsetY / TicTacToeUI.#CELL_SIZE);
    let col = Math.floor(event.offsetX / TicTacToeUI.#CELL_SIZE);

    this.#processTurn(row, col, 1); // user is player '1'
  }

}

/* When page DOM is fully loaded, create an instance of the TicTacToeUI class */
window.onload = () => {
  let ticTacToeUI = new TicTacToeUI();
}