'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Image extends Model {
    
    //Uma imagem pertence a um produto
    product(){
        return this.belongsTo('App/Models/Product')
    }
}

module.exports = Image
