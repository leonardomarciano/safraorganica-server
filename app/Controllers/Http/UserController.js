'use strict'

const User = use("App/Models/User")

class UserController {
    async create ({ request }) {
        const data = request.only(["username", "email", "password", "type", "status"])
        data.status = 0
        const user = await User.create(data)
        return user
      }

    async VerifyPhone ({request, response, auth}){
      
    }
}

module.exports = UserController
