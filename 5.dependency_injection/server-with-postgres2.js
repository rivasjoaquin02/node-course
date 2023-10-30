import { createApp } from "./app.js";
import { MovieModel } from "./models/postgresv2/movie.js";

createApp({ movieModel: MovieModel });
