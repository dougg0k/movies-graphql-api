import {
	attachActorToMovie,
	attachDirectorToMovie,
	createMovie,
	generateRandomNumber,
	getAllMovies
} from "../services/movie.service";

const movieResolver = {
	Query: {
		movies: async (_, __, { db }, info) => {
			const movies = await getAllMovies(info, db);
			const updatedMovies = movies.map(movie => ({
				...movie,
				scoutbase_rating: generateRandomNumber(5.0, 9.0)
			}));
			return updatedMovies;
		}
	},
	Mutation: {
		createMovie: async (
			_,
			{ movie: { title, year, rating, actorIds, directorIds } },
			{ db }
		) => {
			const [movieCreated] = await createMovie({ title, year, rating }, db);

			const actorIdsToAttach = actorIds.map(id => ({
				movie_id: movieCreated.id,
				actor_id: id
			}));
			await attachActorToMovie(actorIdsToAttach, db);
			const directorIdsToAttach = directorIds.map(id => ({
				movie_id: movieCreated.id,
				director_id: id
			}));
			await attachDirectorToMovie(directorIdsToAttach, db);

			return movieCreated;
		}
	}
};

export default movieResolver;
