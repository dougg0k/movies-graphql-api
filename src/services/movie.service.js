import { useJoinMonster } from "../utils/helpers";
import TABLES from "../utils/tablesName";

const generateRandomNumber = (min, max) =>
	(Math.random() * (max - min) + min).toFixed(1);

const getAllMovies = (info, db) => useJoinMonster(db, info, {});

const createMovie = async (movie, db) => {
	try {
		return await db(TABLES.MOVIES)
			.returning("*")
			.insert({
				title: movie.title,
				year: movie.year,
				rating: movie.rating
			});
	} catch (err) {
		return [err];
	}
};

const attachActorToMovie = async (ids, db) => {
	try {
		return await db.batchInsert(TABLES.MOVIES_ACTORS, ids);
	} catch (err) {
		return [err];
	}
};

const attachDirectorToMovie = async (ids, db) => {
	try {
		return await db.batchInsert(TABLES.MOVIES_DIRECTORS, ids);
	} catch (err) {
		return [err];
	}
};

export {
	generateRandomNumber,
	getAllMovies,
	createMovie,
	attachActorToMovie,
	attachDirectorToMovie
};
