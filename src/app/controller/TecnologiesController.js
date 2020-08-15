const models = require('../model');

class Tecnologies {
  async index(req, res) {
    const tec = await models.Tecnologies.findAll();
    res.json(tec);
  }
  async store(req, res) {
    const tec = await models.Tecnologies.create({ name: 'React-navigation' });
    res.json(tec);
  }
  async update() {}
  async delete() {}
}

module.exports = new Tecnologies();
