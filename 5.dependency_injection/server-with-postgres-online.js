import { createApp } from "./app.js";
import { MovieModel } from "./models/postgres-online/movie.js";

createApp({ movieModel: MovieModel });
