const fs = require("node:fs/promises");
const path = require("node:path");

const folder = process.argv[2] ?? ".";

async function ls(folder) {
	let files;

	try {
		files = await fs.readdir(folder);
	} catch (error) {
		console.error("Error while reading the dir ", error);
		process.exit(1);
	}

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
		const fileSize = stats.size;
		const fileModified = stats.mtime.toLocaleString();

		return `${fileType} ${file.padEnd(25)} ${fileSize.toLocaleString().padStart(10)} ${fileModified}`;
	});

	const filesInfo = await Promise.all(filesPromises);
	filesInfo.forEach((fileInfo) => console.log(fileInfo));
}

ls(folder);
