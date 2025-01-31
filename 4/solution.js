// --- Day 4: Ceres Search ---

import fs from 'fs';

console.time('time');

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const get = (x, y) => {
  return x >= 0 && y >= 0 && x < lines[0].length && y < lines.length ? lines[y][x] : '.';
};

const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [-1, 1], [1, -1], [1, 1]];
const xmas = 'XMAS';

let part_1 = 0, part_2 = 0;

for (let y = 0; y < lines.length; ++y) {
  for (let x= 0; x < lines[0].length; ++x) {
    // first part
    for (let dir of dirs) {
      let xx = x, yy = y, i = 0, matched = true;

      while (i < xmas.length) {
        if (get(xx, yy) !== xmas[i]) {
          matched = false;
          break;
        }
        xx += dir[0];
        yy += dir[1];
        ++i;
      }

      part_1 += matched ? 1 : 0;
    }

    // second part
    if (get(x, y) === 'A') {
      const around = [
        get(x - 1, y - 1), get(x + 1, y - 1),
        get(x + 1, y + 1), get(x - 1, y + 1)
      ].join('');

      part_2 += ['MSSM', 'MMSS', 'SMMS', 'SSMM'].includes(around) ? 1 : 0;
    }
  }
}

console.log(`part 1: ${part_1}`);
console.log(`part 2: ${part_2}`);

console.timeEnd('time');