const TABLES = require("../utils/tablesName");

exports.up = function(knex) {
	return knex.schema.createTable(TABLES.DIRECTORS, function(table) {
		table.increments("id");
		table.string("name", 255);
		table.date("birthday");
		table.string("country", 255);
		table.timestamps(false, true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable(TABLES.DIRECTORS);
};
