'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
| A complete guide on routing in adonisjs is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


/*
|--------------------------------------------------------------------------
| Useless
|--------------------------------------------------------------------------
| Low priority informations and routes.
*/
const _PREFIX = '/v1'
Route.get('/', () => {
  return { API: 'Safra Organica - 1.0' }
})


/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
| Routes for using the authetincation model.
*/
Route.post(`${_PREFIX}/user/login`, 'SessionController.create')

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
| Routes for using the user model.
*/
Route.post(`${_PREFIX}/user/registration`, 'UserController.create')
Route.post(`${_PREFIX}/user/login`, 'UserController.create')

/*
|--------------------------------------------------------------------------
| Advertisement Routes
|--------------------------------------------------------------------------
| Routes for using the Advertisement model.
| Methods: Index, show, store, update, destroy
*/
Route.resource(`${_PREFIX}/advertisement`, 'AdvertisementController')
  .apiOnly()
  .middleware('auth')

Route.post(`${_PREFIX}/product/:id/images`, 'ImageController.store')
  .middleware('auth')