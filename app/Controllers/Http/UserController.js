'use strict'

const User = use("App/Models/User")

class UserController {
    async create ({ request }) {
        const data = request.only(["username", "email", "password", "type", "status"])
        data.status = 0
        const user = await User.create(data)
        await user.transaction().create({ 
          origin: 0,
          type: "credit",
          cashierName: "Conta Aberta",
          Description: "Conta Aberta",
          amount: 0.00,
          oldBalance: 0.00,
          newBalance: 0.00
         })
        return user
      }

    async VerifyPhone ({request, response, auth}){
      
    }
}

module.exports = UserController
