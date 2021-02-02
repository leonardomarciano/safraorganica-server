'use strict'

const { findByOrFail } = require('../../Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Advertisement = use('App/Models/Advertisement')

/**
 * Resourceful controller for interacting with advertisements
 */
class AdvertisementController {
  /**
   * Show a list of all advertisements.
   * GET advertisements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const { latitude, longitude, range } = request.all()

    const advertisement = Advertisement.query()
    .nearBy(latitude, longitude, range)
    .fetch()

  return advertisement
  }

  /**
   * Render a form to be used for creating a new advertisement.
   * GET advertisements/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new advertisement.
   * POST advertisements
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'coverage',
      'payments_methods',
    ])

    data.active = false
  
    const advertisement = await Advertisement.create({ ...data, user_id: id })
  
    return advertisement
  }

  /**
   * Display a single advertisement.
   * GET advertisements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const ad = await Advertisement.query()
        .with('products')
        .with('products.image')
        .where('id', params.id)
        .first()
    
        if (!ad) {
          throw new Error("not found")
        }
      return ad
    } catch (error) {
      console.log(error)
      response.status(404).json({
        code: 'NOT_FOUND',
        message: 'Resource not found'
      })

    }
  }

  /**
   * Render a form to update an existing advertisement.
   * GET advertisements/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update advertisement details.
   * PUT or PATCH advertisements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a advertisement with id.
   * DELETE advertisements/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const property = await Advertisement.findOrFail(params.id)
    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
    await property.delete()
  
  }
}

module.exports = AdvertisementController
