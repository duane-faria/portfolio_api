const express = require('express');
const Youch = require('youch');
const { resolve } = require('path');
const Sentry = require('@sentry/node');
const cors = require('cors');
require('./database');
require('express-async-errors');

class App {
  constructor() {
    this.server = express();
    Sentry.init({
      dsn:
        'https://4551711d4daf4ad8987606cf959e116d@o432232.ingest.sentry.io/5395840',
    });
    this.middlewares();
    this.routes();
    this.handleExceptions();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'files', 'uploads'))
    );
  }

  routes() {
    this.server.use(require('./routes'));
    this.server.use(Sentry.Handlers.requestHandler());
  }

  handleExceptions() {
    this.server.use(async (err, req, res, next) => {
      const errors = await new Youch(err, req).toJSON();
      console.log(errors);
      return res.status(500).json(errors);
    });
  }
}

module.exports = new App().server;
