'use strict'

const Product = use('App/Models/Product')
const Helpers = use('Helpers')

const { v4: uuidv4 } = require('uuid');
 // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ request,response , params }) {
    const product = await Product.findOrFail(params.id)

    const images = request.file('image', {
        types: ['image'],
        size: '2mb'
      })

    await images.move(Helpers.tmpPath('uploads'), {
        name: uuidv4() + '.' + images.subtype
    })

    
      if (!images.moved()) {
        return images.errors()
      }
    
      
      await product.image().create({ path: images.fileName })

      return response.status(201).json({status: 'success'})
      
}

    async show ({ params, response }) {
        return response.download(Helpers.tmpPath(`uploads/${params.path}`))
    }

}

module.exports = ImageController