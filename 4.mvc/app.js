import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();

app.disable("x-powered-by");

app.use(json()); // middleware for parsing json body
app.use(corsMiddleware({ acceptedOrigins: process.env.FRONTEND })); // middleware for CORS

// routes
app.use("/movies", moviesRouter);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
	console.log(`server listen on port http://localhost:${PORT}`);
});
