const express = require('express');
const Youch = require('youch');
const { resolve } = require('path');

require('./database');
require('express-async-errors');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.handleExceptions();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'files', 'uploads'))
    );
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
