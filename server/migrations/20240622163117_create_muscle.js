export function up(knex) {
  return knex.schema.createTable('muscle', (table) => {
    table.binary('id', 16).primary();
    table.binary('databaseId', 16).notNullable();
    table.string('url');
    table.timestamp('lastEditedTime').notNullable().defaultTo(knex.fn.now());
    table.string('name').notNullable();
  });
}


export function down(knex) {
  return knex.schema.dropTable('muscle');
};
