import { gql } from "apollo-server-express";

const linkTypeDefs = gql`
	extend type Movie {
		actors: [Actor]
		directors: [Director]
	}

	extend type Actor {
		movies: [Movie]
	}

	extend type Director {
		movies: [Movie]
	}
`;

export default linkTypeDefs;
