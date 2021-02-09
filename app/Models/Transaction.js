'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Transaction extends Model {

    //Uma imagem pertence a um produto
    user(){
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Transaction
