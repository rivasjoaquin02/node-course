const http = require("node:http");
const process = require("process");
const { findAvailablePort } = require("./13.free-port");

const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
	console.log("request received");
	res.end("Hello World");
});

findAvailablePort(desiredPort).then((port) =>
	server.listen(port, () =>
		console.log(`server listening on http://localhost:${port}`)
	)
);
