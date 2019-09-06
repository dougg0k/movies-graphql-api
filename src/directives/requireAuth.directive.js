import { unauthorized } from "@hapi/boom";
import { SchemaDirectiveVisitor } from "apollo-server-express";
import { verifyJWT } from "../services/auth.service";

const ERR_MSG = "You must be authenticated to view this resource:";
class RequireAuthDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		field.resolve = async function(result, args, context, info) {
			const token = context.req.headers.authorization;
			const errWithField = `${ERR_MSG} ${info.fieldName}`;
			if (!token) {
				throw unauthorized(errWithField);
			}
			try {
				verifyJWT(token);
				return result[field.name];
			} catch (err) {
				throw unauthorized(errWithField);
			}
		};
	}
}

export default RequireAuthDirective;
