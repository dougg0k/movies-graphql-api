import { gql, makeExecutableSchema } from "apollo-server-express";

const directorSchema = makeExecutableSchema({
	typeDefs: gql`
		type Director {
			id: ID
			name: String
			birthday: String
			country: String
		}

		type Query {
			directors: [Director]
		}

		type Mutation {
			createDirector(name: String, birthday: String, country: String): Director
		}
	`
});

export default directorSchema;
