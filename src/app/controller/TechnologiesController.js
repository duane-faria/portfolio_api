const models = require('../model');

class Technologies {
  async index(req, res) {
    const tec = await models.Technologies.findAll();
    res.json(tec);
  }

  async store(req, res) {
    const { name } = req.body;

    const TecAlreadyExists = await models.Technologies.findOne({
      where: {
        name,
      },
    });

    if (TecAlreadyExists) {
      return res.status(400).json({ error: 'Technology already exists' });
    }

    const tec = await models.Technologies.create({ name });

    res.json(tec);
  }

  async update() {}

  async delete() {}
}

module.exports = new Technologies();
