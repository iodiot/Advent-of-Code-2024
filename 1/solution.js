// --- Day 1: Historian Hysteria ---

import fs from 'fs';

console.time('time');

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const left = lines.map(line => Number.parseInt(line.split('   ')[0])).sort();
const right = lines.map(line => Number.parseInt(line.split('   ')[1])).sort();

let diff = 0;
let sim = 0;

for (let i = 0; i < left.length; i++) {
 diff += Math.abs(left[i] - right[i]);
 sim += left[i] * right.filter(r => r === left[i]).length;
}

console.log(`part 1: ${diff}`);
console.log(`part 2: ${sim}`);

console.timeEnd('time');