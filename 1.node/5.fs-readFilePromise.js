const fs = require('node:fs');
const { promisify } = require('node:util');

const readFilePromise = promisify(fs.readFile);

console.log('Reading the first file...');
readFilePromise('./file.txt', 'utf-8')
  .then((text) => console.log(text))
  .catch((error) => console.log(error));

console.log('Hacer cosas mientras lee el archivo');

console.log('Reading the second file...');
readFilePromise('./file2.txt', 'utf-8')
  .then((text) => console.log(text))
  .catch((error) => console.log(error));
