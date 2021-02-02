'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdvertisementSchema extends Schema {
  up () {
    this.create('advertisements', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('address').notNullable()
      table.json('payments_methods').notNullable()
      table.bool('active') 
      table.decimal('coverage', 10).notNullable() 
      table.decimal('latitude', 9, 6).notNullable()
      table.decimal('longitude', 9, 6).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('advertisements')
  }
}

module.exports = AdvertisementSchema
