const Router = require('express').Router;
const multer = require('multer');
const controllers = require('./app/controller');
const AuthMiddleware = require('./app/middlewares/auth');
const multerConfig = require('./config/multer');
const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/user', controllers.UserController.store);
routes.post('/session', controllers.SessionController.store);

routes.use(AuthMiddleware);

routes.get('/user', controllers.UserController.index);
routes.post(
  '/projects',
  uploads.array('files', 12),
  controllers.ProjectController.store
);

module.exports = routes;
