import TABLES from "../utils/tablesName";
import { hashPassword } from "./auth.service";

const createUser = async (user, db) => {
	const passwordHashed = await hashPassword(user.password);
	return await db(TABLES.USERS)
		.returning("*")
		.insert({
			username: user.username,
			password: passwordHashed
		});
};

const findUserByUsername = async (username, db) => {
	try {
		return await db(TABLES.USERS)
			.where("username", username)
			.first();
	} catch (err) {
		return err;
	}
};

export { createUser, findUserByUsername };
