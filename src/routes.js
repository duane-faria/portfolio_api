const Router = require('express').Router;
const multer = require('multer');
const controllers = require('./app/controller');
const AuthMiddleware = require('./app/middlewares/auth');
const multerConfig = require('./config/multer');
const routes = new Router();

const uploads = multer(multerConfig);

routes.post('/user', controllers.UserController.store);
routes.post('/session', controllers.SessionController.store);
routes.get('/projects', controllers.ProjectController.index);
routes.get('/technologies', controllers.TechnologiesController.index);

routes.use(AuthMiddleware);

routes.get('/user', controllers.UserController.index);
routes.post(
  '/projects',
  uploads.array('files', 12),
  controllers.ProjectController.store
);
routes.put('/projects', controllers.ProjectController.update);
routes.delete('/projects/:id', controllers.ProjectController.delete);
routes.post('/technologies', controllers.TechnologiesController.store);
routes.put('/technologies', controllers.TechnologiesController.update);
routes.delete('/technologies/:id', controllers.TechnologiesController.delete);
routes.post(
  '/files',
  uploads.array('files', 12),
  controllers.FilesController.store
);

module.exports = routes;
