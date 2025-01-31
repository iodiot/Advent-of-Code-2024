// --- Day 7: Bridge Repair ---

import fs from 'fs';

console.time('time');

function calculate(test, values, operands) {
  let result = values[0];

  for (let i = 0; i < values.length - 1; ++i) {

    if (operands[i] === '0') {
      result += values[i + 1];
    } else if (operands[i] === '1') {
      result *= values[i + 1];
    } else {
      result = Number.parseInt(`${result}${values[i + 1]}`);
    }
  }

  return result === test;
}

function cycle(equations, useConcatenation = false) {
  let result = 0;

  for (const eq of equations) {
    const test = eq[0], values = eq.slice(1);

    const radix = useConcatenation ? 3 : 2;

    for (let i = 0; i < Math.pow(radix, values.length - 1); ++i) {
      const operands = i.toString(radix).padStart(values.length - 1, '0');

      if (calculate(test, values, operands)) {
        result += test;
        break;
      }
    }
  }

  return result;
}

const equations = fs.readFileSync('./input.txt', 'utf8').trim().split('\n')
  .map(line => line.match(/\d+/g).map(str => Number.parseInt(str)));

console.log(`part 1: ${cycle(equations)}`);
console.log(`part 2: ${cycle(equations, true)}`);

console.timeEnd('time');