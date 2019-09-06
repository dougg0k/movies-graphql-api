import { gql, makeExecutableSchema } from "apollo-server-express";

const userSchema = makeExecutableSchema({
	typeDefs: gql`
		type Mutation {
			login(username: String!, password: String!): UserWithToken
			createUser(username: String!, password: String!): UserWithToken
		}

		type User {
			id: ID
			username: String
			name: String
		}

		type UserWithToken {
			token: String
			user: User
		}
	`
});

export default userSchema;
