const Router = require('express').Router;
const controllers = require('./app/controller');
const AuthMiddleware = require('./app/middlewares/auth');
const routes = new Router();

routes.post('/user', controllers.UserController.store);
routes.post('/session', controllers.SessionController.store);

routes.use(AuthMiddleware);

routes.get('/user', controllers.UserController.index);

module.exports = routes;
