'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table
        .integer('advertisement_id')
        .unsigned()
        .references('id')
        .inTable('advertisements')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title', 32).notNullable()
      table.string('description', 32).notNullable()
      table.integer('value', 32).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
