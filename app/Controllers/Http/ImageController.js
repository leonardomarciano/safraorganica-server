'use strict'

const Image = use('App/Models/Image')
const Product = use('App/Models/Product')
const Helpers = use('Helpers')

/**
 * Resourceful controller for interacting with images
 */
class ImageController {
  /**
   * Create/save a new image.
   * POST images
   */
  async store ({ request, params }) {
    const product = await Product.findOrFail(params.id)

    const images = request.file('image', {
        types: ['image'],
        size: '2mb'
      })
    
    //   await images.move(Helpers.tmpPath('uploads'), file => ({
    //     name: `${Date.now()}-${file.clientName}.${images.subtype}`
    //   }))

    await images.move(Helpers.tmpPath('uploads'), {
        name: Date.now() + '.' + images.subtype
    })

    
      if (!images.moved()) {
        return images.errors()
      }
    
      
      await product.image().create({ path: images.fileName })
      
}
}

module.exports = ImageController