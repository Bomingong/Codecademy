// Minesweeper Part 5 - Adding Class Structure
// Add a board and game class
// Create an instance of a game and play a move
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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

// determine the size of the game Board
// use the locatin of the flipped tile
// use an array index offset system to check all adjacent tiles for bombs
// if a bomb exists, increment the bombCounter
// number of adjacent bombs to the flipped tile will be returned by the function
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
  const numberOfRows = bombBoard.length;
  // total number of columns
  const numberOfColumns = bombBoard[0].length;
  // store the number of bombs adjacent to the flipped tile
  let numberOfBombs = 0;
  // iterate through potential neighbors of the selected tile and return number of bombs in valid adjacent neighbors
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = rowIndex + offset[0];
    const neighborColumnIndex = columnIndex + offset[1];
    // Are the row and columns of neighboring tiles valid
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

// allow the player to flip a tile and update that tile concurrently
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    return 'This tile has already been flipped!';
  } else if (bombBoard[rowIndex][columnIndex] == 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
}

// formats board
let printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

// creates player board
let playerBoard = generatePlayerBoard(3, 4);
// creates bomb board
let bombBoard = generateBombBoard(3, 4, 3);
console.log('Player Board: ');
printBoard(playerBoard)
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 2, 1);
console.log('Updated Player Board: ');
printBoard(playerBoard);
