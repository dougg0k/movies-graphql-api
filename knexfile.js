require("dotenv").config({ path: "./.env" });

module.exports = {
	development: {
		client: "postgresql",
		connection: {
			host: process.env.DATABASE_HOST,
			database: process.env.DATABASE_DB,
			user: process.env.DATABASE_USER,
			password: process.env.DATABASE_PASSWORD
		},
		migrations: {
			tableName: "migrations",
			directory: "./src/migrations"
		},
		useNullAsDefault: true,
		debug: process.env.NODE_ENV === "development"
	}
};
