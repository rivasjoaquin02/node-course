// input arguments
console.log(process.argv);

// control process events
process.on("exit", () => {
	// cleaning
});

// current working directory
console.log(process.cwd());

// env variables
console.log(process.env.NODE_ENV);


// control the process and is exit code
process.exit(0);
