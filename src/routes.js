const Router = require('express').Router;
const controllers = require('./app/controller');

const routes = new Router();

routes.get('/', controllers.UserController.index);

routes.post('/user', controllers.UserController.store);
routes.get('/user', controllers.UserController.index);

module.exports = routes;
