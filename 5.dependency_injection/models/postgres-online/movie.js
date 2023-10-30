import pg from "pg";
import "dotenv/config";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const DEFAULT_CONFIG = {
	host: PGHOST,
	database: PGDATABASE,
	username: PGUSER,
	password: PGPASSWORD,
	port: 5432,
	ssl: "require",
	connection: {
		options: `project=${ENDPOINT_ID}`,
	},
};

const connection = new pg.Client(DEFAULT_CONFIG);
await connection.connect();

export class MovieModel {
	static async getAll({ genre }) {
		let query = {
			text: "SELECT * FROM movie",
			values: [],
		};

		if (genre) {
			const genreInLowerCase = genre.toLowerCase();
			query = {
				text: `
				SELECT *
				FROM movie
				WHERE id = (SELECT movie_id
					FROM movie_genres
					WHERE genre_id = (SELECT id FROM genre WHERE name ILIKE $1))`,
				values: [genreInLowerCase],
			};
		}

		const { rows: movies } = await connection.query(query);
		return movies;
	}

	static async getById({ id }) {
		const { rows: movie } = await connection.query(
			"SELECT * FROM movie WHERE id = $1",
			[id]
		);
		return movie[0];
	}

	static async create({ input }) {
		const { title, year, director, duration, poster, rate } = input;

		const { rows } = await connection.query(
			"SELECT gen_random_uuid() uuid;"
		);
		const [{ uuid: id }] = rows;

		const query = {
			text: `
			INSERT INTO 
			movie  (id, title, year, director, duration, poster, rate)
			VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			values: [id, title, year, director, duration, poster, rate],
		};

		try {
			await connection.query(query);
		} catch (error) {
			console.log("An Error has append ", error);
			throw new Error("Error creating movie");
			// send the trace to a internal service
			// sendTrace(error)
		}

		return { id, title, year, director, duration, poster, rate };
	}

	static async delete({ id }) {
		const query = {
			text: `
				DELETE FROM movie WHERE id = $1
			`,
			values: [id],
		};

		const { rowCount } = await connection.query(query);
		return rowCount > 0;
	}

	static async update({ id, input }) {
		const movie = await this.getById({ id });
		const updatedMovie = {
			...movie,
			...input,
		};
		const { title, year, director, duration, poster, rate } = updatedMovie;

		const updateQuery = {
			text: `
			UPDATE movie
			SET title    = $2,
				year     = $3,
				director = $4,
				duration = $5,
				poster   = $6,
				rate     = $7
			WHERE id = $1`,
			values: [id, title, year, director, duration, poster, rate],
		};

		await connection.query(updateQuery);
		return updatedMovie;
	}
}
