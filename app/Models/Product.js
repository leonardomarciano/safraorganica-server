'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Product extends Model {
    //Um produto tem uma imagem
    image () {
        return this.hasOne('App/Models/Image')
      }
}

module.exports = Product
