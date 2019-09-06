import TABLES from "../utils/tablesName";

export default {
	User: {
		sqlTable: TABLES.USERS,
		uniqueKey: "id",
		fields: {
			name: { sqlColumn: "name" },
			username: { sqlColumn: "username" }
		}
	},
	Director: {
		sqlTable: TABLES.DIRECTORS,
		uniqueKey: "id",
		fields: {
			name: { sqlColumn: "name" },
			birthday: {
				sqlColumn: "birthday",
				resolve: director => new Date(director.birthday).toISOString()
			},
			country: { sqlColumn: "country" },
			movies: {
				junction: {
					sqlTable: TABLES.MOVIES_DIRECTORS,
					sqlJoins: [
						(directorsTable, moviesDirectorsTable) =>
							`${directorsTable}.id = ${moviesDirectorsTable}.director_id`,
						(moviesDirectorsTable, moviesTable) =>
							`${moviesDirectorsTable}.movie_id = ${moviesTable}.id`
					]
				}
			}
		}
	},
	Actor: {
		sqlTable: TABLES.ACTORS,
		uniqueKey: "id",
		fields: {
			name: { sqlColumn: "name" },
			birthday: {
				sqlColumn: "birthday",
				resolve: actor => new Date(actor.birthday).toISOString()
			},
			country: { sqlColumn: "country" },
			movies: {
				junction: {
					sqlTable: TABLES.MOVIES_ACTORS,
					sqlJoins: [
						(actorsTable, moviesActorsTable) =>
							`${actorsTable}.id = ${moviesActorsTable}.actor_id`,
						(moviesActorsTable, movieTable) =>
							`${moviesActorsTable}.movie_id = ${movieTable}.id`
					]
				}
			}
		}
	},
	Movie: {
		sqlTable: TABLES.MOVIES,
		uniqueKey: "id",
		fields: {
			title: { sqlColumn: "title" },
			year: { sqlColumn: "year" },
			rating: { sqlColumn: "rating" },
			directors: {
				junction: {
					sqlTable: TABLES.MOVIES_DIRECTORS,
					sqlJoins: [
						(moviesTable, moviesDirectorsTable) =>
							`${moviesTable}.id = ${moviesDirectorsTable}.movie_id`,
						(moviesDirectorsTable, directorsTable) =>
							`${moviesDirectorsTable}.director_id = ${directorsTable}.id`
					]
				}
			},
			actors: {
				junction: {
					sqlTable: TABLES.MOVIES_ACTORS,
					sqlJoins: [
						(moviesTable, moviesActorsTable) =>
							`${moviesTable}.id = ${moviesActorsTable}.movie_id`,
						(moviesActorsTable, actorsTable) =>
							`${moviesActorsTable}.actor_id = ${actorsTable}.id`
					]
				}
			}
		}
	}
};
