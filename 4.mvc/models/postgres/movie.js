import pg from "pg";

const config = {
	host: "localhost",
	user: "postgres",
	password: "1234",
	database: "moviesdb",
	port: 5432,
};

const client = new pg.Client(config);
await client.connect();

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

		const { rows: movies } = await client.query(query);
		return movies;
	}

	static async getById({ id }) {
		const { rows: movie } = await client.query(
			"SELECT * FROM movie WHERE id = $1",
			[id]
		);
		return movie[0];
	}

	static async create({ input }) {
		const { title, year, director, duration, poster, rate } = input;

		const { rows } = await client.query("SELECT gen_random_uuid() uuid;");
		const [{ uuid: id }] = rows;

		const query = {
			text: `
			INSERT INTO 
			movie  (id, title, year, director, duration, poster, rate)
			VALUES ($1, $2, $3, $4, $5, $6, $7)`,
			values: [id, title, year, director, duration, poster, rate],
		};

		try {
			await client.query(query);
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

		const { rowCount } = await client.query(query);
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

		await client.query(updateQuery);
		return updatedMovie;
	}
}
