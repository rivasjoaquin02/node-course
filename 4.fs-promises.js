const fs = require('node:fs/promises');

console.log('Reading the first file...');
fs.readFile('./file.txt', 'utf-8')
  .then((text) => console.log(text))
  .catch((error) => console.log(error));

console.log('Hacer cosas mientras lee el archivo');

console.log('Reading the second file...');
fs.readFile('./file2.txt', 'utf-8')
  .then((text) => console.log(text))
  .catch((error) => console.log(error));
