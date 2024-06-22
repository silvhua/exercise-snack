export function up(knex) {
  return knex.schema.createTable('focus', (table) => {
    table.binary('id', 128).primary();
    table.binary('database_id', 128).notNullable();
    table.string('url');
    table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
    table.string('name').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('focus');
};
