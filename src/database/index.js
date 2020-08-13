const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const models = require('../app/model');

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    const modelsArr = Object.values(models);
    modelsArr
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
