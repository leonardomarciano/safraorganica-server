'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransactionSchema extends Schema {
  up () {
    this.create('transactions', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('type', 64).notNullable()
      table.integer('origin', 64).notNullable() //integrar posteriormente com carrinho
      table.string('cashierName', 128).notNullable()
      table.string('Description', 128)
      table.decimal('amount',14,2).notNullable();
      table.decimal('oldBalance',14,2).notNullable();
      table.decimal('newBalance',14,2).notNullable();
      table.timestamps()
    })
  }

  down () {
    this.drop('transactions')
  }
}

module.exports = TransactionSchema
