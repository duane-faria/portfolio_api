const express = require('express');
const Youch = require('youch');
require('./database');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.handleExceptions();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(require('./routes'));
  }

  handleExceptions() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

module.exports = new App().server;
