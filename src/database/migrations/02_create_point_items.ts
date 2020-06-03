import Knex from 'knex';

export async function up(knex: Knex) {
  // create table
  return knex.schema.createTable('point_items', table => {
    table.increments('id').primary();
    table.integer('image')
    .notNullable()
    .references('id')
    .inTable('points');

    table.integer('title')
    .notNullable()
    .references('id')
    .inTable('items');
  })
}


export async function down(knex: Knex) {
  // rollback table
  return knex.schema.dropTable('point_items');
}