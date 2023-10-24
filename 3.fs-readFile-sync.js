const fs = require("node:fs");

console.log("Reading the first file...");
const firstText = fs.readFileSync("./file.txt", "utf-8");

console.log("Hacer cosas mientras lee el archivo");

console.log("Reading the second file...");
const secondText = fs.readFileSync("./file2.txt", "utf-8");
