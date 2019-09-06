import { createActor, getAllActors } from "../services/actor.service";

const actorResolver = {
	Query: {
		actors: (_, __, { db }, info) => {
			return getAllActors(info, db);
		}
	},
	Mutation: {
		createActor: async (_, { name, birthday, country }, { db }) => {
			const [actorCreated] = await createActor({ name, birthday, country }, db);
			return actorCreated;
		}
	}
};

export default actorResolver;
