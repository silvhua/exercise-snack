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
    table
      .binary('muscles_id', 128)
    table
      .foreign('muscles_id')
      .references('id').inTable('muscle')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table
      .binary('movement_category_id', 128)
    table
      .foreign('movement_category_id')
      .references('id').inTable('movement_category')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('strength').notNullable();
    table
      .binary('modifier_id', 128)
    table
      .foreign('modifier_id')
      .references('id').inTable('modifier')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table
      .binary('condition_id', 128)
    table
      .foreign('condition_id')
      .references('id').inTable('condition')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table
      .binary('discreetness_id', 128)
    table
      .foreign('discreetness_id')
      .references('id').inTable('discreetness')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('exertion').notNullable();
    table
      .binary('environment_id', 128);
    table.binary('focus_id', 128);
    table
      .foreign('focus_id')
      .references('id').inTable('focus')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp('last_edited_time').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('exercise');
};
