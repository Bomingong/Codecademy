// Prints board to console with formatting
const printBoard = (board) => {
  console.log('Current Board: ')
  console.log(board[0].join('|'));
  console.log(board[1].join('|'));
  console.log(board[2].join('|'));
}
//  Creates board spaces
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];
printBoard(board);

// Inputs a miss and hit
board[0][1] = '1';
board[2][2] = 'B';
printBoard(board);
