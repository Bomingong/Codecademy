'use strict';

// Minesweeper Part 2
// Used nested arrays to manually create a game board
// Wrote a function to neatly log the game board
// Accessed the nested arrays to set a guess and a bomb on the game board
var printBoard = function printBoard(board) {
  console.log('Current Board: ');
  console.log(board[0].join('|'));
  console.log(board[1].join('|'));
  console.log(board[2].join('|'));
};
var board = [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']];
printBoard(board);
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);