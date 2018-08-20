'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Minesweeper Part 5 - Adding Class Structure
// Create Board and Game classes to create new games and store game info
var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game Over!');
        this._board.print();
      } else if (!this._board.hasSafeTiles()) {
        console.log('Congratulations!!! You just won!');
      } else {
        console.log('Current Board: ');
        this._board.print();
      }
    }
  }]);

  return Game;
}();

var Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',


    // allow the player to flip a tile and update that tile concurrently
    value: function flipTile(rowIndex, columnIndex) {
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

  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      // flipped tile can have 8 possible neighbors
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
      // total number of rows
      var numberOfRows = this._bombBoard.length;
      // total number of columns
      var numberOfColumns = this._bombBoard[0].length;
      // store the number of bombs adjacent to the flipped tile
      var numberOfBombs = 0;
      // iterate through potential neighbors of the selected tile and return number of bombs in valid adjacent neighbors
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColumnIndex = columnIndex + offset[1];
        // Are the row and columns of neighboring tiles valid
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
          if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }

    // formats board

  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
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
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      // for loop iterating through numberOfRows
      for (var r = 0; r < numberOfRows; r++) {
        // create an empty row array
        var row = [];
        // for loop iterating through numberOfColumns
        for (var c = 0; c < numberOfColumns; c++) {
          // push empty spaces onto the row array
          row.push(null);
        }
        // push the row onto the empty board array
        board.push(row);
      }

      // bomb counter
      var numberOfBombsPlaced = 0;
      // while loop that randomly places bombs on board until numberOfBombsPlaced = numberOfBombs
      // may potentially place a bomb over a space that already has a bomb and increment counter
      // will be fixed with control flow
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
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
  }]);

  return Board;
}();

var g = new Game(3, 3, 3);
g.playMove(1, 1);
g.playMove(0, 0);