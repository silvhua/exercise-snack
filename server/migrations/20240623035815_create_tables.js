export function up(knex) {
  return knex.schema
    .dropTableIfExists('exercise')
    .createTable('exercise', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('url');
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.integer('strength').notNullable();
      table.integer('exertion').notNullable();
      table.timestamp('last_edited_time').defaultTo(knex.fn.now());
      table.binary('database_id', 128).notNullable();
    })
    .dropTableIfExists('environment')
    .createTable('environment', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('discreetness')
    .createTable('discreetness', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.float('level');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('movement')
    .createTable('movement', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('condition')
    .createTable('condition', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('focus')
    .createTable('focus', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('modifier')
    .createTable('modifier', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('muscle')
    .createTable('muscle', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .dropTableIfExists('exercise_environment')
    .createTable('exercise_environment', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('environment_id', 128).references('id').inTable('environment').onDelete('CASCADE');
    })
    .dropTableIfExists('exercise_discreetness')
    .createTable('exercise_discreetness', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('discreetness_id', 128).references('id').inTable('discreetness').onDelete('CASCADE');
    })
    .dropTableIfExists('exercise_movement')
    .createTable('exercise_movement', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('movement_id', 128).references('id').inTable('movement').onDelete('CASCADE');
    })
    .dropTableIfExists('exercise_condition')
    .createTable('exercise_condition', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('condition_id', 128).references('id').inTable('condition').onDelete('CASCADE');
    })
    .dropTableIfExists('exercise_focus')
    .createTable('exercise_focus', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('focus_id', 128).references('id').inTable('focus').onDelete('CASCADE');
    })
    .dropTableIfExists('exercise_modifier')
    .createTable('exercise_modifier', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('modifier_id', 128).references('id').inTable('modifier').onDelete('CASCADE');
    })
    .dropTableIfExists('exercise_muscle')
    .createTable('exercise_muscle', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise').onDelete('CASCADE');
      table.binary('muscle_id', 128).references('id').inTable('muscle').onDelete('CASCADE');
    })
};



export function down(knex) {
  return knex.schema
    .dropTableIfExists('exercise_discreetness')
    .dropTableIfExists('exercise_movement')
    .dropTableIfExists('exercise_condition')
    .dropTableIfExists('exercise_environment')
    .dropTableIfExists('exercise_focus')
    .dropTableIfExists('exercise_modifier')
    .dropTableIfExists('exercise_muscle')
    .dropTableIfExists('exercise')
    .dropTableIfExists('environment')
    .dropTableIfExists('created_time')
    .dropTableIfExists('discreetness')
    .dropTableIfExists('focus')
    .dropTableIfExists('condition')
    .dropTableIfExists('modifier')
    .dropTableIfExists('movement')
    .dropTableIfExists('muscle')
};
