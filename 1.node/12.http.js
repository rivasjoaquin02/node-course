const http = require("node:http");

const desiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
	res.setHeader("Content-Type", "text/html; charset=utf-8");

	if (req.url === "/") {
		res.statusCode = 200;
		res.end("<h1>Hello World</h1>");
	} else if (req.url == "/contact") {
		res.statusCode = 200;
		res.end("<h1>Contact</h1>");
	} else {
		res.statusCode = 404;
		res.end("<h1>404</h1>");
	}
});

server.listen(desiredPort, () => {
	console.log(
		`server listening on port http://localhost:${server.address().port}`
	);
});
