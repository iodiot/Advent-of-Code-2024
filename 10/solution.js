// --- Day 10: Hoof It ---

import fs from 'fs';

const START = 0;
const END = 9;

function computeScore(grid, distinct = false) {
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  const w = grid[0].length, h = grid.length;
  const memory = {};
  let score = 0;

  const get = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return -1;
    return grid[y][x];
  }

  const hash = (x, y) => `${x},${y}`;

  for (let i = END; i >= START; --i) {
    for (let y = 0; y < h; ++y) {
      for (let x = 0; x < w; ++x) {
        if (get(x, y) !== i) continue;

        if (get(x, y) === END)
        {
          memory[hash(x, y)] = distinct ? 1 : new Set([[x, y]]);
          continue;
        }

        let adder = distinct ? 0 : new Set();

        for (const [dx, dy] of dirs) {
          const nx = x + dx, ny = y + dy;

          if (get(nx, ny) === i + 1) {
            if (distinct) {
              adder += memory[hash(nx, ny)];
            } else {
              memory[hash(nx, ny)].forEach(el => adder.add(el));
            }
          }
        }

        memory[hash(x, y)] = adder;

        if (i === START) score += distinct ? adder : adder.size;
      }
    }
  }

  return score;
}

console.time('time');

const grid = fs.readFileSync('./input.txt', 'utf8').trim().split('\n')
  .map(line => line.split('').map(ch => ch === '.' ? -1 : Number.parseInt(ch)));

console.log(`part 1: ${ computeScore(grid) }`);
console.log(`part 2: ${ computeScore(grid, true) }`);

console.timeEnd('time');