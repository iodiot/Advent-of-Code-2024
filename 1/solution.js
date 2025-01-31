// --- Day 1: Historian Hysteria ---

import fs from 'fs';

console.time('time');

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const parseAndSort = (index) =>
  lines.map(line => Number.parseInt(line.split('   ')[index])).sort();

const left = parseAndSort(0);
const right = parseAndSort(1);

let diff = 0;
let sim = 0;

for (let i = 0; i < left.length; ++i) {
 diff += Math.abs(left[i] - right[i]);
 sim += left[i] * right.filter(r => r === left[i]).length;
}

console.log(`part 1: ${diff}`);
console.log(`part 2: ${sim}`);

console.timeEnd('time');
