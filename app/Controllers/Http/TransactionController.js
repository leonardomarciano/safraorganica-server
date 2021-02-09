'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User")
const Transaction = use("App/Models/Transaction")
var mercadopago = require('mercadopago');
// mercadopago.configure({
//     access_token: 'YOUR_ACCESS_TOKEN'
// });


/**
 * Resourceful controller for interacting with transactions
 */
class TransactionController {
  /**
   * Show a list of all transactions.
   * GET transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new transaction.
   * GET transactions/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async credit ({ request, response, auth }) {
    const {type, origin, cashierName, Description, amount} = request.body
    const {id} = auth.user
    const c = await User.find(id)
    const l = await Transaction.query().where('user_id', id).last()

    const newBalance = parseFloat(l.newBalance) + parseFloat(amount);
    await  c.transaction().create({
      type: 'credit',
      origin,
      cashierName,
      Description,
      amount,
      newBalance: newBalance,
      oldBalance: l.oldBalance
    })

  const t = await Transaction.query().where('user_id', id).last()
  response.json(t)
  }

  /**
   * Create/save a new transaction.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async debit ({ request, response }) {
  }


    /**
   * Display a single transaction.
   * GET transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async balance ({ request, response, auth }) {
    const {id} = auth.user

    const c = await Transaction.query().where('user_id', id).last()

    if(c){
      response.status(200).json({
        balance: c.newBalance,
        last_transaction: {
          id: c.id,
          amount: c.amount,
          type: c.type,
          title: c.cashierName,
          description: c.Description
        }
      })
    }else{
      response.status(404).json({
        error: 'WALLET_NOT_FOUND'
      })
    }
    

  }


  /**
   * Display a single transaction.
   * GET transactions/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  
  /**
   * Create/save a new transaction with pending status.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async pending ({ request, response }) {
  }

  
  /**
   * Create/save a new transaction with fail status.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async fail ({ request, response }) {
  }

  
  /**
   * Create/save a new transaction.
   * POST transactions
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async success ({ request, response }) {
  }

}

module.exports = TransactionController
