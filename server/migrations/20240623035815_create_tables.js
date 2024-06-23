export function up(knex) {
  return knex.schema
    .createTable('exercise', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.integer('strength').notNullable();
      table.integer('exertion').notNullable();
      table.timestamp('last_edited_time').defaultTo(knex.fn.now());
    })
    .createTable('environment', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
    })
    .createTable('discreetness', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('movement', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('condition', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('focus', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('modifier', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('muscle', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('exercise_environment', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('environment_id', 128).references('id').inTable('environment').onDelete('CASCADE');
    })
    .createTable('exercise_discreetness', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('discreetness_id', 128).references('id').inTable('discreetness').onDelete('CASCADE');
    })
    .createTable('exercise_movement', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('movement_id', 128).references('id').inTable('movement').onDelete('CASCADE');
    })
    .createTable('exercise_condition', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('condition_id', 128).references('id').inTable('condition').onDelete('CASCADE');
    })
    .createTable('exercise_focus', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('focus_id', 128).references('id').inTable('focus').onDelete('CASCADE');
    })
    .createTable('exercise_modifier', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('modifier_id', 128).references('id').inTable('modifier').onDelete('CASCADE');
    })
    .createTable('exercise_muscle', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('muscle_id', 128).references('id').inTable('muscle').onDelete('CASCADE');
    })
};



export function down(knex) {
  return knex.schema
    .dropTableIfExists('exercise_discreetness')
    .dropTableIfExists('exercise_.binary(128)')
    .dropTableIfExists('exercise_condition')
    .dropTableIfExists('exercise_focus')
    .dropTableIfExists('exercise_modifier')
    .dropTableIfExists('exercise_muscle')
    .dropTableIfExists('exercise')
    .dropTableIfExists('created_time')
    .dropTableIfExists('discreetness')
    .dropTableIfExists('.binary(128)')
    .dropTableIfExists('condition')
    .dropTableIfExists('modifier')
    .dropTableIfExists('muscle')
};
