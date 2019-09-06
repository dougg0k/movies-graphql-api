const TABLES = require("../utils/tablesName");

exports.up = function(knex) {
	return Promise.all([
		knex.schema.createTable(TABLES.MOVIES, function(table) {
			table.increments("id");
			table.string("title", 255);
			table.string("year", 4);
			table.string("rating", 4);
			table.timestamps(false, true);
		}),
		knex.schema.createTable(TABLES.MOVIES_DIRECTORS, function(table) {
			table.increments("id").primary();
			table.integer("movie_id").references("movies.id");
			table.integer("director_id").references("directors.id");
		}),
		knex.schema.createTable(TABLES.MOVIES_ACTORS, function(table) {
			table.increments("id").primary();
			table.integer("movie_id").references("movies.id");
			table.integer("actor_id").references("actors.id");
		})
	]);
};

exports.down = function(knex) {
	return Promise.all([
		knex.schema.dropTable(TABLES.MOVIES),
		knex.schema.dropTable(TABLES.MOVIES_DIRECTORS),
		knex.schema.dropTable(TABLES.MOVIES_ACTORS)
	]);
};
