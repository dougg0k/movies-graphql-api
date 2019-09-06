import joinMonster from "join-monster";
import { DIALECT } from "../utils/constants";

export const useJoinMonster = (db, info, args = {}) =>
	joinMonster(info, args, sql => db.raw(sql), { dialect: DIALECT });
