// --- Day 2: Red-Nosed Reports ---

import fs from 'fs';

console.time('time');

function isSafe(digits) {
  const sign = Math.sign(digits[1] - digits[0]);

  for (let i = 1; i < digits.length; ++i) {
    const diff = digits[i] - digits[i - 1];
    const absDiff = Math.abs(diff);

    if (Math.sign(diff) !== sign || (absDiff < 1 || absDiff > 3)) {
      return false;
    }
  }

  return true;
}

function countSafeReports(lines, canRemove = false) {
  let safe = 0;

  for (let line of lines) {
    const digits = line.split(' ').map(w => Number.parseInt(w));

    if (isSafe(digits)) {
      safe++;
      continue;
    }

    if (canRemove) {
      let foundSafe = false;

      for (let i = 0; i < digits.length; ++i) {
        const newReport = digits.slice(0, i).concat(digits.slice(i + 1));

        if (isSafe(newReport)) {
          foundSafe = true;
          break;
        }
      }

      if (foundSafe) {
        ++safe;
      }
    }
  }

  return safe;
}

const lines = fs.readFileSync('./input.txt', 'utf8').trim().split('\n');

console.log(`part 1: ${countSafeReports(lines)}`);
console.log(`part 2: ${countSafeReports(lines, true)}`);

console.timeEnd('time');
