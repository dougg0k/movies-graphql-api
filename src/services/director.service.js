import { useJoinMonster } from "../utils/helpers";
import TABLES from "../utils/tablesName";

const createDirector = async (director, db) => {
	return await db(TABLES.DIRECTORS)
		.returning("*")
		.insert({
			name: director.name,
			birthday: director.birthday,
			country: director.country
		});
};

const getAllDirectors = (info, db) => useJoinMonster(db, info, {});

export { createDirector, getAllDirectors };
