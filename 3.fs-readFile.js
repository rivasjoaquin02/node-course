const fs = require("node:fs");

console.log("Reading the first file...");
fs.readFile("./file.txt", "utf-8", (error, text) => {
	console.log(text);
});

console.log("Hacer cosas mientras lee el archivo");

console.log("Reading the second file...");
fs.readFile("./file2.txt", "utf-8", (error, text) => {
	console.log(text);
});
