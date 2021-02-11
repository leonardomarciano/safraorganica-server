'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User")
const Transaction = use("App/Models/Transaction")
var mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: 'TEST-3895756420862269-011312-d31cde14e79f390e8e5f71e1d98393b9-237189895'
});


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

  async notificationService ({request, response, params}){
    const payload = request.all()
    const query = request.get()
    var merchant_order
    var payment

    switch (query.topic) {
      case 'payment':
        payment = await mercadopago.payment.findById(query.id)
        merchant_order = await mercadopago.merchant_orders.findById(payment.body.order.id)
        break;  
      default:
        merchant_order = await mercadopago.merchant_orders.findById(query.id)
        break;
    }

    var paid_amount = 0
    console.log(payment)
    if(payment.body.status == 'approved'){
      //TODO = NOTIFICACAO DE PEDIDO APROVADO PARA COMERCIANTE E COMPRADOR
      response.status(200).send("approved")
    }else{
      response.status(200).send("received status")
    }

    //TODO = ATUALIZAR STATUS DE CART PARA PAGO
    
    

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
    var preference = {
      binary_mode: true,
      external_reference: "manoa",
      notification_url: "https://0053192d976e.ngrok.io/mercadopago",
      items: [
        {
          title: 'TestE',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: 10.5
        }
      ]
    };
    const mp = await mercadopago.preferences.create(preference)
    response.json(mp)
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
