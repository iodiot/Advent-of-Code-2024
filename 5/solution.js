// --- Day 5: Print Queue ---

import fs from 'fs';

console.time('time');

function isUpdateCorrect(rules, update) {
  for (let i = 0; i < update.length - 1; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const key = update[i].toString();

      if (!rules[key]?.includes(update[j])) return false;
    }
  }

  return true;
}

function fixUpdate(rules, update) {
  for (let i = 0; i < update.length - 1; ++i) {
    for (let j = i + 1; j < update.length; ++j) {
      const key = update[i].toString();

      if (!rules[key]?.includes(update[j])) {
        const fixedUpdate = [...update];
        [fixedUpdate[i], fixedUpdate[j]] = [fixedUpdate[j], fixedUpdate[i]];
        return fixedUpdate;
      }
    }
  }
}

function calculateSum(rules, updates, onlyIncorrect = false) {
  let sum = 0;

  for (let update of updates) {
    const isCorrect = isUpdateCorrect(rules, update);

    if (onlyIncorrect) {
      if (isCorrect) continue;

      do {
        update = fixUpdate(rules, update);
      } while (!isUpdateCorrect(rules, update));

      sum += update[Math.floor(update.length / 2)];
    } else {
      sum += isCorrect ? update[Math.floor(update.length / 2)] : 0;
    }
  }

  return sum;
}

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

const n = lines.indexOf('');

const rules = {};
const updates = lines.splice(n + 1).map((line) => line.split(',').map(str => Number.parseInt(str)));

lines.splice(0, n).forEach((line) => {
  const [left, right] = line.split('|').map(str => Number.parseInt(str));

  if (left in rules) {
    rules[left].push(right);
  } else {
    rules[left] = [right];
  }
});

console.log(`part 1: ${calculateSum(rules, updates)}`);
console.log(`part 2: ${calculateSum(rules, updates, true)}`);

console.timeEnd('time');