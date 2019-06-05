'use strict';

class GameOfLife {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.grid = Array(height).fill('').map(() => { return Array(width).fill('.'); });
  }

  get area () {
    return this.height * this.width;
  }

  get liveCellCount () {
    return this.grid.reduce((total, currentRow) => total + GameOfLife.liveCellsInRow(currentRow), 0);
  }

  static liveCellsInRow (row) {
    return row.reduce((total, cell) => total + (cell === '*' ? 1 : 0), 0);
  }

  static randomInt (max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  fromRandom (liveCellCount) {
    if (liveCellCount > this.area || liveCellCount < 0) {
      throw ('Invalid number of cells');
    }

    while (liveCellCount > 0) {
      let row = GameOfLife.randomInt(this.height);
      let column = GameOfLife.randomInt(this.width);
      if (this.grid[row][column] === '.') {
        this.grid[row][column] = '*';
        liveCellCount--;
      }
    }
  }

  fromString (gridString) {
    let rows = gridString.split('\n');
    if (rows.length !== this.height) {
      throw ('Invalid grid definition');
    }
    rows.forEach((row, rowIndex) => {
      if (row.length !== this.width) {
        throw ('Invalid grid definition');
      } else {
        this.grid[rowIndex] = row.split('');
      }
    });
  }

  numberOfNeighbors (row, column) {
    if (row < 0 || row > this.height - 1 || column < 0 || column > this.width - 1) {
      throw 'Invalid cell';
    }
    let neighbors = this.grid[row][column] === '*' ? -1 : 0;
    for (let y = Math.max(row - 1, 0); y < Math.min(row + 2, this.height); y++) {
      for (let x = Math.max(column - 1, 0); x < Math.min(column + 2, this.width); x++) {
        neighbors += this.grid[y][x] === '*' ? 1 : 0;
      }
    }
    return neighbors;
  }

  iterateGeneration () {
    const nextGeneration = Array(this.height);
    this.grid.forEach((row, index) => { nextGeneration[index] = row.slice(0); });
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.numberOfNeighbors(y, x);
        if (neighbors < 2) {
          nextGeneration[y][x] = '.';
        } else if (neighbors > 3) {
          nextGeneration[y][x] = '.';
        } else if (this.grid[y][x] === '.' && neighbors === 3) {
          nextGeneration[y][x] = '*';
        }
      }
    }
    this.grid = nextGeneration;
  }

  toString () {
    return this.grid.map((row) => {
      return row.join(' ');
    }).join('\n');
  }

  static answer () {
    return 6 * 7;
  }
}

module.exports = GameOfLife;
