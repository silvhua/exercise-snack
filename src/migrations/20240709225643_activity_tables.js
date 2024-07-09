export function up(knex) {
  return knex.schema
  .createTable('program', (table) => {
    table.binary('id', 128).primary();
    table
      .binary('user_id', 128);
    table.json('exercises');
  })
};



export function down(knex) {
  return knex.schema
    .dropTableIfExists('program')
};

