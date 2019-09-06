const TABLES = require("../utils/tablesName");

exports.up = function(knex) {
	return knex.schema.createTable(TABLES.USERS, function(table) {
		table.increments("id");
		table.string("name", 255);
		table.string("username", 255).unique();
		table.string("password", 255).notNullable();
		table.timestamps(false, true);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTable(TABLES.USERS);
};
