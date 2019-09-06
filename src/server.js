import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";
import helmet from "helmet";
import joinMonsterAdapt from "join-monster-graphql-tools-adapter";
import knex from "knex";
import joinMetadata from "./utils/joinMetadata";
import { createSchema } from "./utils/mergeSchemas";
dotenv.config();

const setupApp = async () => {
	const app = express();
	const db = knex(require("../knexfile")[process.env.NODE_ENV]);
	app.use(helmet());

	const schema = await createSchema();
	joinMonsterAdapt(schema, joinMetadata);

	return { app, db, schema };
};

const watchForErrors = db => {
	process.on("uncaughtException", error => {
		console.error(`${new Date().toUTCString()} - uncaughtException: `, error);
		process.exit(1);
	});
	process.on("unhandledRejection", error => {
		console.error("uncaughtRejection: ", error);
	});
	process.on("SIGINT", async () => {
		try {
			await db.destroy();
			process.exit(0);
		} catch (err) {
			process.exit(1);
		}
	});
};

const startServer = async () => {
	const { app, db, schema } = await setupApp();

	const server = new ApolloServer({
		schema,
		context: ({ req, res }) => ({ req, res, db }),
		introspection: process.env.NODE_ENV === "development",
		playground: true,
		debug: false,
		formatError: err => {
			if (err.extensions.exception && err.extensions.exception.output.payload) {
				return err.extensions.exception.output.payload;
			}
			return err;
		},
		validationRules: [depthLimit(3)]
	});

	server.applyMiddleware({
		app,
		path: "/graphql",
		cors: {
			origin: process.env.CORS_ORIGIN,
			credentials: true
		}
	});

	const PORT = Number(process.env.APP_PORT) || 4000;
	app.listen({ port: PORT }, () =>
		console.log(`🚀 Server ready at port ${PORT}`)
	);

	watchForErrors(db);
};

startServer();
