process.env.PWD = process.cwd();
const express = require('express');
require('dotenv/config');
const Youch = require('youch');
const { resolve,normalize,join } = require('path');
const Sentry = require('@sentry/node');
const cors = require('cors');
require('./database');
require('express-async-errors');

class App {
  constructor() {
    this.server = express();
    Sentry.init({
      dsn:
        process.env.SENTRY_DSN,
    });
    this.middlewares();
    this.routes();
    this.handleExceptions();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(cors());
    
  }

  routes() {
    this.server.use(require('./routes'));
    this.server.use(Sentry.Handlers.requestHandler());
  }

  handleExceptions() {
    this.server.use(async (err, req, res, next) => {
      if(process.env.NODE_ENV==='development'){
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({error:'Internal server error'});

    });
  }
}

module.exports = new App().server;
