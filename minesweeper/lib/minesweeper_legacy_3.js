'use strict';

// Minesweeper Part 3 - dynamically generate game boards
// Wrote a function to generate a player board
// Wrote a function to generate a bomb board and randomly place bombs on the board
// Refactored the printBoard() function
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  var board = [];
  // for loop iterating through numberOfRows
  for (var r = 0; r < numberOfRows; r++) {
    // create an empty row array
    var row = [];
    // for loop iterating through numberOfColumns
    for (var c = 0; c < numberOfColumns; c++) {
      // push empty spaces onto the row array
      row.push(' ');
    };
    // push the row onto the empty board array
    board.push(row);
  };
  // return the board array
  return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  var board = [];
  // for loop iterating through numberOfRows
  for (var r = 0; r < numberOfRows; r++) {
    // create an empty row array
    var row = [];
    // for loop iterating through numberOfColumns
    for (var c = 0; c < numberOfColumns; c++) {
      // push empty spaces onto the row array
      row.push(null);
    };
    // push the row onto the empty board array
    board.push(row);
  };
  // bomb counter
  var numberOfBombsPlaced = 0;
  // while loop that randomly places bombs on board until numberOfBombsPlaced = numberOfBombs
  // may potentially place a bomb over a space that already has a bomb and increment counter
  // will be fixed with control flow
  while (numberOfBombsPlaced < numberOfBombs) {
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    board[randomRowIndex][randomColumnIndex] = 'B';
    numberOfBombsPlaced++;
  };

  // return the board array
  return board;
};

// formats board
var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

// creates player board
var playerBoard = generatePlayerBoard(3, 4);
// creates bomb board
var bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);