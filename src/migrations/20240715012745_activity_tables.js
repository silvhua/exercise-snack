export function up(knex) {
  return knex.schema
  .dropTableIfExists('activity')
  .dropTableIfExists('session')
  .dropTableIfExists('user')
  .createTable('user', (table) => {
    table.binary('id', 128).primary();
    table.string('username').unique();
    table.string('email').unique();
    table.string('password');
    table.string('first_name');
    table.string('last_name');
    table.string('gender');
    table.string('country');
    table.string('url');
    table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_time').defaultTo(knex.fn.now());
  })
  .createTable('session', (table) => {
    table.binary('id', 128).primary();
    table
      .binary('user', 128)
      .references('id').inTable('user').notNullable()
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_time').defaultTo(knex.fn.now());
    table.string('url');
  })
  .createTable('activity', (table) => {
    table.binary('id', 128).primary();
    table.integer('reps');
    table.integer('duration');
    table
      .binary('exercise_id', 128).notNullable()
      .references('id').inTable('exercise')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table
      .binary('session_id', 128).notNullable()
      .references('id').inTable('session')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
    table.string('notes');
    table.string('url');
    table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_time').defaultTo(knex.fn.now());
  })
  .createTable('program', (table) => {
    table.binary('id', 128).primary();
    table.string('name');
    table
      .binary('user_id', 128);
    table.json('exercises');
    table.json('filters');
    table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
    table.timestamp('created_time').defaultTo(knex.fn.now());
  })
};

export function down(knex) {
  return knex.schema
  .dropTableIfExists('program')
  .dropTableIfExists('activity')
  .dropTableIfExists('session')
  .dropTableIfExists('user')
};
