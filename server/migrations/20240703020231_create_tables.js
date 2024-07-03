export function up(knex) {
  return knex.schema
    .dropTableIfExists('exercise_discreetness')
    .dropTableIfExists('exercise_movement')
    .dropTableIfExists('exercise_condition')
    .dropTableIfExists('exercise_environment')
    .dropTableIfExists('exercise_focus')
    .dropTableIfExists('exercise_modifier')
    .dropTableIfExists('exercise_muscle')
    .dropTableIfExists('exercise_tip')
    .dropTableIfExists('environment')
    .dropTableIfExists('created_time')
    .dropTableIfExists('discreetness')
    .dropTableIfExists('focus')
    .dropTableIfExists('condition')
    .dropTableIfExists('modifier')
    .dropTableIfExists('movement')
    .dropTableIfExists('muscle')
    .dropTableIfExists('video')
    .dropTableIfExists('tip')
    .dropTableIfExists('user')
    .dropTableIfExists('activity')
    .dropTableIfExists('session')
    .dropTableIfExists('exercise')
    .createTable('exercise', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.integer('strength').notNullable();
      table.integer('exertion').notNullable();
      table.binary('video', 128);
      table.string('url');
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.timestamp('last_edited_time').defaultTo(knex.fn.now());
      table.binary('database_id', 128).notNullable();
    })
    .createTable('environment', (table) => {
      table.binary('id', 128).primary();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.string('name').notNullable();
    })
    .createTable('discreetness', (table) => {
      table.binary('id', 128).primary();
      table.float('level');
      table.string('description');
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.binary('database_id', 128).notNullable();
    })
    .createTable('movement', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('body_region');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('condition', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('focus', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('description');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('modifier', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('description');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('muscle', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('body_region');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('video', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('src');
      table.string('thumbnail');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('tip', (table) => {
      table.binary('id', 128).primary();
      table.string('name').notNullable();
      table.string('text');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('user', (table) => {
      table.binary('id', 128).primary();
      table.string('username');
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      table.string('gender');
      table.string('country');
      table.binary('database_id', 128).notNullable();
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('session', (table) => {
      table.binary('id', 128).primary();
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
      table.binary('database_id', 128).notNullable();
      table.string('url');
    })
    .createTable('activity', (table) => {
      table.binary('id', 128).primary();
      table.integer('reps');
      table.integer('duration');
      table
        .binary('exercise_id', 128)
        .references('id').inTable('exercise')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table
        .binary('session_id', 128)
        .references('id').inTable('session')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      table.binary('database_id', 128).notNullable();
      table.string('notes');
      table.string('url');
      table.timestamp('last_edited_time').notNullable().defaultTo(knex.fn.now());
      table.timestamp('created_time').defaultTo(knex.fn.now());
    })
    .createTable('exercise_environment', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('environment_id', 128).references('id').inTable('environment')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_discreetness', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('discreetness_id', 128).references('id').inTable('discreetness')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_movement', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('movement_id', 128).references('id').inTable('movement')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_condition', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('condition_id', 128).references('id').inTable('condition')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_focus', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('focus_id', 128).references('id').inTable('focus')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_modifier', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('modifier_id', 128).references('id').inTable('modifier')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_muscle', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('muscle_id', 128).references('id').inTable('muscle')
        .onDelete('CASCADE').onUpdate('CASCADE');
    })
    .createTable('exercise_tip', (table) => {
      table.increments('id').primary();
      table.binary('exercise_id', 128).references('id').inTable('exercise')
        .onDelete('CASCADE').onUpdate('CASCADE');
      table.binary('tip_id', 128).references('id').inTable('tip')
        .onDelete('CASCADE').onUpdate('CASCADE');
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
    .dropTableIfExists('exercise_tip')
    .dropTableIfExists('environment')
    .dropTableIfExists('created_time')
    .dropTableIfExists('discreetness')
    .dropTableIfExists('focus')
    .dropTableIfExists('condition')
    .dropTableIfExists('modifier')
    .dropTableIfExists('movement')
    .dropTableIfExists('muscle')
    .dropTableIfExists('video')
    .dropTableIfExists('tip')
    .dropTableIfExists('user')
    .dropTableIfExists('activity')
    .dropTableIfExists('exercise')
    .dropTableIfExists('session')
};

