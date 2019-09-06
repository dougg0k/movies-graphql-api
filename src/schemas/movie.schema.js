import { gql, makeExecutableSchema } from "apollo-server-express";

const movieSchema = makeExecutableSchema({
	typeDefs: gql`
		directive @requireAuth on FIELD_DEFINITION

		type Movie {
			id: ID
			title: String
			year: String
			rating: Float
			scoutbase_rating: String @requireAuth
		}

		input CreateMovie {
			title: String
			year: String
			rating: Float
			actorIds: [Int]
			directorIds: [Int]
		}

		type Query {
			movies: [Movie]
		}

		type Mutation {
			createMovie(movie: CreateMovie): Movie
		}
	`
});

export default movieSchema;
