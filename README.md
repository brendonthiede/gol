# Game of Life

Your task is to write a program to calculate the next
generation of Conway's game of life, given any starting
position.

You start with a two dimensional grid of cells, where
each cell is either alive or dead. The grid is finite,
and no life can exist off the edges. When calculating
the next generation of the grid, follow these four rules:

1. Any live cell with fewer than two live neighbors
   dies, as if caused by under-population.
2. Any live cell with more than three live neighbors
   dies, as if by overcrowding.
3. Any live cell with two or three live neighbors
   lives on to the next generation.
4. Any dead cell with exactly three live neighbors
   becomes a live cell.

Examples: * indicates live cell, . indicates dead cell

Example input: (4 x 8 grid)

```text
4 8
........
....*...
...**...
........
```

Example output:

```text
4 8
........
...**...
...**...
........
```

---

To use this kata tool, you can run the following:

```bash
npm install
npm run watch
```

While the watcher is running, you can add any new test cases, refactor existing code, etc. and tests will be run on each save.

To see the actual output of running the GOL simulation:

```bash
node index.js
```
