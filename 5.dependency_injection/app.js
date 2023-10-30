import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { createMovieRouter } from "./routes/movies.js";

export const createApp = ({ movieModel }) => {
	const app = express();
	app.disable("x-powered-by");

	// middlewares
	app.use(json()); // for parsing json body
	app.use(corsMiddleware({ acceptedOrigins: process.env.FRONTEND })); // for CORS

	// routes
	app.use("/movies", createMovieRouter({ movieModel }));

	const PORT = process.env.PORT ?? 3000;
	app.listen(PORT, () => {
		console.log(`server listen on port http://localhost:${PORT}`);
	});
};
