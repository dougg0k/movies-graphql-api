import { useJoinMonster } from "../utils/helpers";
import TABLES from "../utils/tablesName";

const createActor = async (actor, db) => {
	return await db(TABLES.ACTORS)
		.returning("*")
		.insert({
			name: actor.name,
			birthday: actor.birthday,
			country: actor.country
		});
};

const getAllActors = (info, db) => useJoinMonster(db, info, {});

export { createActor, getAllActors };
