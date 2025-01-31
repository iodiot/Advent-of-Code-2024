// --- Day 6: Guard Gallivant ---

import fs from 'fs';

console.time('time');

function traverse(grid, detectLoops = false) {
  const cycle = '^>v<';
  const dirs = {'^': [0, -1], '>': [1, 0], 'v': [0, 1], '<': [-1, 0]};
  const startIndex = grid.flat().indexOf('^');
  const w = grid[0].length, h = grid.length;
  const startX = startIndex % w, startY = Math.floor(startIndex / w);

  let x = startX, y = startY, dir = '^';

  grid[y][x] = '.';

  const mem = {};

  while (x >= 0 && x < w && y >= 0 && y < h) {
    const v = grid[y][x];

    if (v === '#') {
      x -= dirs[dir][0];
      y -= dirs[dir][1];

      const hash = `${x}-${y}-${dir}`;

      if (detectLoops) {
        if (hash in mem) return true;

        mem[hash] = true;
      }

      dir = cycle[(cycle.indexOf(dir) + 1) % 4];
    } else {
      grid[y][x] = 'X';
    }

    x += dirs[dir][0];
    y += dirs[dir][1];
  }

  return detectLoops ? false : grid.flat().filter(v => v === 'X').length;
}

function deepCopy(array) {
  return JSON.parse(JSON.stringify(array));
}

const grid = fs.readFileSync('./input.txt', 'utf8').trim().split('\n').map(line => line.split(''));

console.log(`part 1: ${ traverse(deepCopy(grid)) }`);

let loops = 0;

for (let y = 0; y < grid.length; ++y) {
  for (let x = 0; x < grid[0].length; ++x) {
    if (grid[y][x] === '.') {
      const gridCopy = deepCopy(grid);
      gridCopy[y][x] = '#';

     loops += traverse(gridCopy, true) ? 1 : 0;
    }
  }
}

console.log(`part 2: ${loops}`);

console.timeEnd('time');