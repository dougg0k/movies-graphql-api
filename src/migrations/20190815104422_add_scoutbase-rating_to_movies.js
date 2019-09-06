const TABLES = require("../utils/tablesName");

exports.up = function(knex) {
	return knex.schema.table(TABLES.MOVIES, function(table) {
		table.string("scoutbase_rating", 4).defaultTo(0.0);
	});
};

exports.down = function(knex) {
	return knex.schema.table(TABLES.MOVIES, function(table) {
		table.dropColumn("scoutbase_rating");
	});
};
