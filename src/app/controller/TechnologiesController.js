const models = require('../model');

class Technologies {
  async index(req, res) {
    const { page = 1 } = req.query;
    const tec = await models.Technologies.findAll({
      order: [['created_at', 'DESC']],
      limit: 5,
      offset: (page - 1) * 5,
    });
    const total = await models.Technologies.count();
    const obj = { ...tec, info: { total, limit: 5, page } };
    res.json(obj);
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
