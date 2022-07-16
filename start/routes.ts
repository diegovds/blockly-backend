/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async () => {
    return { API: 'My Blockly Maze' }
  })

  Route.post('/users', 'UsersController.store')
  Route.get('/users/:id', 'UsersController.showById')
  Route.get('/users/:id/:uid', 'UsersController.showByUid')
  Route.get('/users', 'UsersController.index')
  Route.put('/users/:id', 'UsersController.update')
  Route.delete('/users/:id', 'UsersController.destroy')
  //Route.resource('/users', 'UsersController').apiOnly()

  //Route.resource('/mazes', 'MazesController').apiOnly()
  Route.post('/users/:userId/mazes', 'MazesController.store')
  Route.get('/mazes/:id', 'MazesController.show')
  Route.get('/mazes', 'MazesController.index')
  Route.put('/mazes/:id', 'MazesController.update')
  Route.delete('/mazes/:id', 'MazesController.destroy')
}).prefix('/api')
