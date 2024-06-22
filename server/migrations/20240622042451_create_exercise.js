/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('exercise', (table) => {
    table.binary('id', 128).primary();
    table.string('name').notNullable();
    table.binary('database_id', 128).notNullable();
    table.string('url');
    table.timestamp('created_time').defaultTo(knex.fn.now());
    table.foreign('muscles_id')
      .references('id').inTable('muscles')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('movement_category_id')
      .references('id').inTable('movement_category')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('strength').notNullable();
    table.foreign('modifier_id')
      .references('id').inTable('modifier')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('condition_id')
      .references('id').inTable('condition')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('discreetness_id')
      .references('id').inTable('discreetness')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('exertion').notNullable();
    table.foreign('environment_id')
      .references('id').inTable('environment')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('focus_id')
      .references('id').inTable('focus')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp('lastEditedTime').defaultTo(knex.fn.now());
    table.index('id');
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('exercise');
};
