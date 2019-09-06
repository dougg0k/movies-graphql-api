import { createDirector, getAllDirectors } from "../services/director.service";

const directorResolver = {
	Query: {
		directors: (_, __, { db }, info) => {
			return getAllDirectors(info, db);
		}
	},
	Mutation: {
		createDirector: async (_, { name, birthday, country }, { db }) => {
			const [directorCreated] = await createDirector(
				{ name, birthday, country },
				db
			);
			return directorCreated;
		}
	}
};

export default directorResolver;
