import { mergeSchemas } from "graphql-tools";
import RequireAuthDirective from "../directives/requireAuth.directive";
import actorResolver from "../resolvers/actor.resolver";
import directorResolver from "../resolvers/director.resolver";
import movieResolver from "../resolvers/movie.resolver";
import userResolver from "../resolvers/user.resolver";
import actorSchema from "../schemas/actor.schema";
import directorSchema from "../schemas/director.schema";
import linkTypeDefs from "../schemas/linkTypeDefs";
import movieSchema from "../schemas/movie.schema";
import userSchema from "../schemas/user.schema";

export const createSchema = async () => {
	return mergeSchemas({
		schemas: [
			userSchema,
			movieSchema,
			actorSchema,
			directorSchema,
			linkTypeDefs
		],
		resolvers: [userResolver, movieResolver, actorResolver, directorResolver],
		schemaDirectives: {
			requireAuth: RequireAuthDirective
		}
	});
};
