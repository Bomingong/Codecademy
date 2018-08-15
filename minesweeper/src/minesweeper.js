// Minesweeper part 3 - dynamically generate game boards
// Using your knowledge of iterators and functions,
// you will be able to dynamically generate a player board.
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
    };
    // push the row onto the empty board array
    board.push(row);
  };
  // bomb counter
  let numberOfBombsPlaced = 0;
  // while loop that randomly places bombs on board until numberOfBombsPlaced = numberOfBombs
  // may potentially place a bomb over a space that already has a bomb and increment counter
  // will be fixed with control flow
  while(numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  };

  // return the board array
  return board;
};

// formats board
let printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

// creates player board
let playerBoard = generatePlayerBoard(3, 4);
// creates bomb board
let bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard)
console.log('Bomb Board: ');
printBoard(bombBoard);
