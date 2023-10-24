const path = require("node:path");

console.log(path.sep);

const filePath = path.join("./",  "file.txt");
console.log(filePath);

const filename = path.basename(filePath, '.txt')
console.log(filename);

const ext = path.extname("hi.image.jpg")
console.log(ext);