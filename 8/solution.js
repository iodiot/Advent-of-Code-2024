// --- Day 8: Resonant Collinearity ---

import fs from 'fs';

function buildAntennas(lines) {
  const antenas = {};

  for (let y = 0; y < lines.length; ++y) {
    for (let x = 0; x < lines[y].length; ++x) {
      const char = lines[y].charAt(x);

      if (char === '.') continue;

      if (!antenas[char]) {
        antenas[char] = [];
      }

      antenas[char].push([x, y]);
    }
  }

  return antenas;
}

function countAntidotes(antennas, w, h, harmonics = false) {
  const antidotes = {};

  const set = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return false;
    antidotes[`${x},${y}`] = '#';
    return true;
  }

  for (const ch of Object.keys(antennas)) {
    const arr = antennas[ch];

    for (let i = 0; i < arr.length; ++i) {
      for (let j = i + 1; j < arr.length; ++j) {
        const [x1, y1] = arr[i];
        const [x2, y2] = arr[j];
        const dx = x2 - x1, dy = y2 - y1;

        let result;
        let n = harmonics ? 0 : 1;

        do {
          const r1 = set(x1 - n * dx, y1 - n * dy);
          const r2 = set(x2 + n * dx, y2 + n * dy);

          result = r1 || r2;
          n += 1;
        } while (result && harmonics);
      }
    }
  }

  return Object.keys(antidotes).length;
}

console.time('time');

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const w = lines[0].length, h = lines.length;
const antennas = buildAntennas(lines);

console.log(`part 1: ${ countAntidotes(antennas, w, h) }`);
console.log(`part 2: ${ countAntidotes(antennas, w, h, true) }`);

console.timeEnd('time');