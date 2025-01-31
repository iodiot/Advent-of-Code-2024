// --- Day 3: Mull It Over ---

import fs from 'fs';

console.time('time');

function scanMemory(memory, checkDoInstructions = false) {
  const regex = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g;
  const digitRegex = /\d{1,3}/g;

  let sum = 0;
  let check = true;

  for (const str of memory.match(regex)) {
    if (str.startsWith('do')) {
      if (!checkDoInstructions) continue;

      check = str.startsWith('do(');
      continue;
    }

    const tokens = str.match(digitRegex).map(Number);

    sum += check ? tokens[0] * tokens[1] : 0;
  }

  return sum;
}

const memory = fs.readFileSync('./input.txt', 'utf8').trim();

console.log(`part 1: ${scanMemory(memory)}`);
console.log(`part 2: ${scanMemory(memory, true)}`);

console.timeEnd('time');