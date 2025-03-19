// --- Day 11: Plutonian Pebbles ---

import fs from 'fs';

const next = (n) => {
  if (n === 0) return 1;
  if (n === 1) return 2024;

  const s = n.toString();
  if (s.length % 2 === 0) {
    return [Number.parseInt(s.slice(0, s.length / 2)), Number.parseInt(s.slice(s.length / 2))];
  }

  return n * 2024;
}

function countStones(line, blinks, dp) {
  if (blinks === 0) return Array.isArray(line) ? line.length : 1;

  if (Array.isArray(line)) {
    return line.reduce((sum, stone) => sum + countStones(stone, blinks, dp), 0);
  }

  const hash = `${line}-${blinks}`;

  if (hash in dp) return dp[hash];

  dp[hash] = countStones(next(line), blinks - 1, dp);

  return dp[hash];
}

console.time('time');

let line = fs.readFileSync('./input.txt', 'utf8').trim().split(' ').map(n => parseInt(n));

const dp = {};

console.log(`part 1: ${ countStones(line, 25, dp) }`);
console.log(`part 2: ${ countStones(line, 75, dp) }`);

console.timeEnd('time');