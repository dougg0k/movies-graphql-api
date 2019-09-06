import { conflict, unauthorized } from "@hapi/boom";
import { generateJWT, isValidPassword } from "../services/auth.service";
import { createUser, findUserByUsername } from "../services/user.service";

const userResolver = {
	Mutation: {
		createUser: async (_, { username, password }, { db }) => {
			const user = await findUserByUsername(username, db);
			if (user) {
				return conflict("User already exists");
			}

			const [userCreated] = await createUser({ username, password }, db);
			const generatedToken = generateJWT(userCreated);
			return {
				token: generatedToken,
				user: userCreated
			};
		},
		login: async (_, { username, password }, { db }) => {
			const user = await findUserByUsername(username, db);

			if (!user) {
				return unauthorized();
			}

			const valid = await isValidPassword(user.password, password);
			if (!valid) {
				return unauthorized();
			}

			const generatedToken = generateJWT(user);
			return {
				token: generatedToken,
				user
			};
		}
	}
};

export default userResolver;
