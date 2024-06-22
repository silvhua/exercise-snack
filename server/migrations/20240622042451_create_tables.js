/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('exercise', (table) => {
    table.binary('id', 16).primary();
    table.string('name').notNullable();
    table.binary('databaseId', 16).notNullable();
    table.string('url');
    table.timestamp('createdTime').defaultTo(knex.fn.now());
    table.foreign('muscles')
      .references('id').inTable('muscles')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('movementCategory')
      .references('id').inTable('movement_category')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('strength').notNullable();
    table.foreign('modifier')
      .references('id').inTable('modifier')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('condition')
      .references('id').inTable('condition')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('discreetness')
      .references('id').inTable('discreetness')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('exertion').notNullable();
    table.foreign('environment')
      .references('id').inTable('environment')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('focus')
      .references('id').inTable('focus')
      .onUpdate('CASCADE').onDelete('CASCADE');
    table.timestamp('lastEditedTime').defaultTo(knex.fn.now());
    table.index('databaseId');
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('exercise');
};
