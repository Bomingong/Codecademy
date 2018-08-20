// Minesweeper Part 5 - Adding Class Structure
// Create Board and Game classes to create new games and store game info
class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Game Over!');
      this._board.print();
    } else if(!this._board.hasSafeTiles()) {
      console.log('Congratulations!!! You just won!');
    } else {
      console.log('Current Board: ');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  // allow the player to flip a tile and update that tile concurrently
  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      return 'This tile has already been flipped!';
    } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  // determine the size of the game Board
  // use the locatin of the flipped tile
  // use an array index offset system to check all adjacent tiles for bombs
  // if a bomb exists, increment the bombCounter
  // number of adjacent bombs to the flipped tile will be returned by the function
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    // flipped tile can have 8 possible neighbors
    const neighborOffsets = [
      [-1,-1],
      [-1, 0],
      [-1,1],
      [0,-1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1]
    ];
    // total number of rows
    const numberOfRows = this._bombBoard.length;
    // total number of columns
    const numberOfColumns = this._bombBoard[0].length;
    // store the number of bombs adjacent to the flipped tile
    let numberOfBombs = 0;
    // iterate through potential neighbors of the selected tile and return number of bombs in valid adjacent neighbors
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = rowIndex + offset[0];
      const neighborColumnIndex = columnIndex + offset[1];
      // Are the row and columns of neighboring tiles valid
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  // formats board
  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    let board = [];
    // for loop iterating through numberOfRows
    for(let r = 0; r < numberOfRows; r++) {
      // create an empty row array
      let row = [];
      // for loop iterating through numberOfColumns
      for(let c = 0; c < numberOfColumns; c++) {
        // push empty spaces onto the row array
        row.push(' ');
      };
      // push the row onto the empty board array
      board.push(row);
    };
    // return the board array
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    let board = [];
    // for loop iterating through numberOfRows
    for(let r = 0; r < numberOfRows; r++) {
      // create an empty row array
      let row = [];
      // for loop iterating through numberOfColumns
      for(let c = 0; c < numberOfColumns; c++) {
        // push empty spaces onto the row array
        row.push(null);
      }
      // push the row onto the empty board array
      board.push(row);
    }

    // bomb counter
    let numberOfBombsPlaced = 0;
    // while loop that randomly places bombs on board until numberOfBombsPlaced = numberOfBombs
    // may potentially place a bomb over a space that already has a bomb and increment counter
    // will be fixed with control flow
    while(numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== 'B') {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }
      // board[randomRowIndex][randomColumnIndex] = 'B';
      // numberOfBombsPlaced++;
    }
    // return the board array
    return board;
  }
}

const g = new Game(3, 3, 3);
g.playMove(1,1);
g.playMove(0,0);
