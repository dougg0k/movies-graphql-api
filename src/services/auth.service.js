import argon2 from "argon2";
import jwt from "jsonwebtoken";

const generateJWT = async user => {
	return await jwt.sign(
		{ id: user.id, username: user.username },
		process.env.JWT_SECRET,
		{
			expiresIn: "6 hours"
		}
	);
};

const verifyJWT = token => {
	const clearToken = token.replace(/Bearer /gi, "");
	return jwt.verify(clearToken, process.env.JWT_SECRET);
};

const hashPassword = async password => await argon2.hash(password);

const isValidPassword = async (userPassword, password) =>
	await argon2.verify(userPassword, password);

export { generateJWT, hashPassword, isValidPassword, verifyJWT };
