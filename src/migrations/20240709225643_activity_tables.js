export function up(knex) {
  return knex.schema
  .createTable('program', (table) => {
    table.binary('id', 128).primary();
    table
      .binary('user_id', 128);
    table.json('exercises');
    table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_time').defaultTo(knex.fn.now());
  })
};



export function down(knex) {
  return knex.schema
    .dropTableIfExists('program')
};

