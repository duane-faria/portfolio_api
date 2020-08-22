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

  async update(req, res) {
    const { id, name } = req.body;
    console.log(req.body);
    const tec = await models.Technologies.update(req.body, { where: { id } });
    return res.json(id);
  }

  async delete(req, res) {
    const { id } = req.params;
    const tec = await models.Technologies.destroy({
      where: {
        id,
      },
    });
    return res.json(id);
  }
}

module.exports = new Technologies();
