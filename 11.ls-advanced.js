const fs = require("node:fs/promises");
const path = require("node:path");
const pc = require("picocolors");
const process = require("node:process");

const folder = process.argv[2] ?? ".";

async function ls(folder) {
	let files;

	try {
		files = await fs.readdir(folder);
	} catch (error) {
		console.error(pc.red(`Error while reading the dir ${folder}`), error);
		process.exit(1);
	}

	// map is parallel
	const filesPromises = files.map(async (file) => {
		const filePath = path.join(folder, file);
		let stats;

		try {
			stats = await fs.stat(filePath); // information
		} catch (error) {
			console.error(`File ${filePath} could not be read`);
			process.exit(1);
		}

		const isDirectory = stats.isDirectory();
		const fileType = isDirectory ? "d" : "f";
		const fileSize = stats.size.toLocaleString();
		const fileModified = stats.mtime.toLocaleString();

		return `${pc.bgMagenta(fileType)} ${pc.blue(
			file.padEnd(25)
		)} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`;
	});

	const filesInfo = await Promise.all(filesPromises);
	filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
