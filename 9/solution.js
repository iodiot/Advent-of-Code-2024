// --- Day 9: Disk Fragmenter ---

import fs from 'fs';

const FREE = '.';

function buildBlocks(input) {
  const blocks = [];
  let id = 0;

  for (let i = 0; i < input.length; ++i) {
    const len = Number.parseInt(input[i]);
    const isFree = i % 2 !== 0;

    blocks.push({ length: len, id: isFree ? '.' : id });

    id += isFree ? 0 : 1;
  }

  return blocks;
}

function printBlocks(blocks) {
  const out = [];

  blocks.forEach(block => out.push(block.id.toString().repeat(block.length)));

  console.log(out.join(''));
}

function compactBlocks(blocks, whole = false) {
  let freePtr = 0, filePtr = blocks.length - 1;

  blocks = [...blocks];

  while (true) {
    while (blocks[filePtr].id === FREE) --filePtr;

    if (whole) freePtr = 0;
    if (freePtr >= filePtr) break;

    const file = blocks[filePtr].length;
    const id = blocks[filePtr].id;

    if (whole) {
      while (freePtr < filePtr) {
        while (blocks[freePtr].id !== FREE) ++freePtr;
        if (blocks[freePtr].length >= file) break;
        freePtr += 1;
      }
      if (freePtr >= filePtr) {
        filePtr -= 1;
        continue;
      }
    } else {
      while (blocks[freePtr].id !== FREE) ++freePtr;
      if (freePtr >= filePtr) break;
    }

    const free = blocks[freePtr].length;

    blocks[freePtr] = { length: Math.min(file, free), id: id };

    if (file < free) {
      blocks.splice(freePtr + 1, 0, { length: free - file, id: FREE });
      filePtr += 1;
    }

    blocks[filePtr] = {
      length: file > free ? file - free : file,
      id: file > free ? id : FREE
    };
  }

  return blocks;
}

function countChecksum(blocks) {
  let sum = (n) => n * (n + 1) / 2;

  let checksum = 0;

  for (let i = 0, ptr = 0; i < blocks.length; ++i) {
    for (let j = 0; j < blocks[i].length; ++j) {
      if (blocks[i].id !== FREE) checksum += ptr * blocks[i].id;
      ptr += 1;
    }
  }

  return checksum;
}

console.time('time');

const input = fs.readFileSync('./input.txt', 'utf8').trim();

const blocks = buildBlocks(input);

console.log(`part 1: ${ countChecksum(compactBlocks(blocks)) }`);
console.log(`part 2: ${ countChecksum(compactBlocks(blocks, true)) }`);

console.timeEnd('time');