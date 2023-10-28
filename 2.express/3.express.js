const express = require("express");
const dittoJSON = require("./pokemon/ditto.json");

const PORT = process.env.PORT ?? 3000;

const app = express();
app.disable("x-powered-by"); //disable the X-Powered-By: Express

// middleware
// app.use((req, res, next) => {
// 	// ej: track the request to DB
// 	// ej: check if the users has cookies

// 	if (req.method !== "POST") return next();
// 	if (req.headers["content-type"] !== "application/json") return next();

// 	let body = "";
// 	req.on("data", (chunk) => {
// 		body += chunk.toString();
// 	});
// 	req.on("end", () => {
// 		const data = JSON.parse(body);
// 		data.timestamp = Date.now();
// 		// mutate the req and put the info in the req.body
// 		req.body = data;
// 		next();
// 	});
// });

// the same as the commented
app.use(express.json());

app.get("/", (req, res) => {
	// res.send("<h1>My page</h1>");
	res.json({ message: "Hello World" });
});

app.get("/pokemon/ditto", (req, res) => {
	res.json(dittoJSON);
});

app.post("/pokemon", (req, res) => {
	// req.body should be stored in DB
	res.status(201).json(req.body);
});

app.use((req, res) => {
	res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`);
});
