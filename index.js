'use strict';

const GameOfLife = require('./gol.js');

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function playGame () {
  const startingBoard = `..........
..........
..........
....*.....
...***....
..........
..........
..........
..........
..........`;

  const gol = new GameOfLife(10, 10);
  gol.fromString(startingBoard);
  let history = [];
  let isCycle = false;
  for (let i = 1; gol.liveCellCount > 0 && !isCycle; i++) {
    const currentGeneration = gol.toString();
    console.log(`
  
  ===========
    Iteration ${i}:`);

    console.log(currentGeneration);
    if (history.includes(currentGeneration)) {
      isCycle = true;
      const cycleStart = history.indexOf(currentGeneration);
      const cycleAge = history.length - cycleStart;
      console.log(`Cycle detected starting ${cycleAge} generations ago (iteration ${cycleStart + 1})`);
    } else {
      history.push(currentGeneration);
      gol.iterateGeneration();
      await sleep(250);
    }
  }
}

playGame();