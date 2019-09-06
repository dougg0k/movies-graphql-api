import { gql, makeExecutableSchema } from "apollo-server-express";

const actorSchema = makeExecutableSchema({
	typeDefs: gql`
		type Actor {
			id: ID
			name: String
			birthday: String
			country: String
		}

		type Query {
			actors: [Actor]
		}

		type Mutation {
			createActor(name: String, birthday: String, country: String): Actor
		}
	`
});

export default actorSchema;
