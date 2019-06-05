'use strict';

const chai = require('chai');
const sinonChai = require('sinon-chai');

global.sinon = require('sinon');
global.assert = chai.assert;
global.expect = chai.expect;
global.should = chai.should();

chai.config.includeStack = true;
chai.use(sinonChai);

const GameOfLife = require('./gol.js');

describe('Test board set up', function () {
  it('should return the answer to life the universe and everything', function () {
    GameOfLife.answer().should.equal(42);
  });

  it('should initialize board with correct dimensions', function () {
    const gol = new GameOfLife(3, 5);
    gol.toString().should.equal(". . . . .\n. . . . .\n. . . . .");
  });

  it('should initialize board with randomness with right number of live cells', function () {
    const gol = new GameOfLife(3, 5);
    gol.fromRandom(3);
    gol.liveCellCount.should.equal(3);
  });

  it('should initialize board with preset grid with right number of live cells', function () {
    const gol = new GameOfLife(3, 5);
    gol.fromString(".*.*.\n*.*.*\n.....");
    gol.liveCellCount.should.equal(5);
    gol.toString().should.equal(". * . * .\n* . * . *\n. . . . .");
  });
});

describe('Test game rules', function () {
  it('should count neighbors correctly', function () {
    const gridString = ".....\n.***.\n.***.\n.***.\n.....";
    const gol = new GameOfLife(5, 5);
    gol.fromString(gridString);
    gol.numberOfNeighbors(0, 0).should.equal(1);
    gol.numberOfNeighbors(1, 1).should.equal(3);
    gol.numberOfNeighbors(2, 2).should.equal(8);
  });

  it('should create new cell for exactly 3 neighbors', function () {
    const gridString = ".....\n...*.\n..**.\n.....\n.....";
    const gol = new GameOfLife(5, 5);
    gol.fromString(gridString);
    gol.iterateGeneration();
    gol.toString().should.equal(". . . . .\n. . * * .\n. . * * .\n. . . . .\n. . . . .");
  });

  it('should kill on under-population', function () {
    const gridString = ".....\n.....\n..**.\n.....\n.....";
    const gol = new GameOfLife(5, 5);
    gol.fromString(gridString);
    gol.iterateGeneration();
    gol.toString().should.equal(". . . . .\n. . . . .\n. . . . .\n. . . . .\n. . . . .");
  });
});