import postgres from "postgres";

const DEFAULT_CONFIG = {
	host: "localhost",
	user: "postgres",
	password: "1234",
	database: "moviesdb",
	port: 5432,
};

const sql = postgres(process.env.POSTGRES_URI ?? DEFAULT_CONFIG);

export class MovieModel {
	static async getAll({ genre }) {
		let movies;

		if (genre) {
			movies = await sql`
			SELECT *
			FROM movie
			WHERE id = (SELECT movie_id
				FROM movie_genres
				WHERE genre_id = (SELECT id FROM genre WHERE name ILIKE ${genre.toLowerCase()}))`;
		} else {
			movies = await sql`SELECT * FROM movie`;
		}

		return movies;
	}

	static async getById({ id }) {
		const movie = await sql`SELECT * FROM movie WHERE id = ${id}`;
		return movie;
	}

	static async create({ input }) {
		const { title, year, director, duration, poster, rate } = input;

		const [{ uuid: id }] = await sql`SELECT gen_random_uuid() uuid;`;
		await sql`
			INSERT INTO 
			movie  (id, title, year, director, duration, poster, rate)
			VALUES (${id}, ${title}, ${year}, ${director}, ${duration}, ${poster}, ${rate})`;

		const movie = await this.getById({ id });
		return movie[0];
	}

	static async delete({ id }) {
		const res = await sql`DELETE FROM movie WHERE id = ${id}`;
		return res;
	}

	static async update({ id, input }) {
		const [originalMovie] = await this.getById({ id });

		const updatedMovie = {
			...originalMovie,
			...input,
		};

		const { title, year, director, duration, poster, rate } = updatedMovie;

		await sql`
		UPDATE movie
		SET title    = ${title},
			year     = ${year},
			director = ${director},
			duration = ${duration},
			poster   = ${poster},
			rate     = ${rate}
		WHERE id = ${id}`;

		return updatedMovie;
	}
}
