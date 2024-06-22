export function up(knex) {
  return knex.schema.createTable('discreetness', (table) => {
    table.binary('id', 16).primary();
    table.binary('id', 16).notNullable();
    table.string('url');
    table.integer('level').notNullable();
    table.timestamp('lastEditedTime').notNullable().defaultTo(knex.fn.now());
    table.string('name').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('discreetness');
};
