const Router = require('express').Router;
const controllers = require('./app/controller');

const routes = new Router();

routes.get('/', controllers.UserController.index);

module.exports = routes;
