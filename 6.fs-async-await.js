const { readFile } = require('node:fs/promises');

async function init() {
  console.log('Reading the first file...');
  const firstText = await readFile('./file.txt', 'utf-8');
  console.log(firstText);

  console.log('Doing stuff while file is been read');

  console.log('Reading the second file...');
  const secondText = await readFile('./file2.txt', 'utf-8');
  console.log(secondText);
}

init();
