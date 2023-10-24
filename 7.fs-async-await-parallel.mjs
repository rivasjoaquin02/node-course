const { readFile } = require("node:fs/promises");

Promise.all([
	readFile("./file.txt", "utf-8"),
	readFile("./file2.txt", "utf-8"),
]).then(([firstText, secondText]) => {
	console.log("first file: \n", firstText);
	console.log("second file: \n",secondText);
});
