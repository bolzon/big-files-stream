'use strict';

const fs = require('fs');
const { Readable } = require('stream');

const writableStream = fs.createWriteStream('./hugefile.txt', { flags: 'w' });
writableStream.on('close', () => {
  console.log('Done.');
});

const readableStream = new Readable();
readableStream._read = () => { };
readableStream.pipe(writableStream);

const mybuf = Buffer.alloc(10 * 1000); // 10KB

// will write chunks of 10KB until 200MB
for (let i = 0; i < 20 * 1000; i++) {
  mybuf.fill((i % 10).toString());
  readableStream.push(mybuf.toString());
}

readableStream.push(null);
