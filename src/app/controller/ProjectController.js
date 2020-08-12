class ProjectController {
  async index() {}
  async store(req, res) {
    console.log(req.body.id, 'from controller');
    return res.json({ msg: 'ok' });
  }
  async update() {}
  async delete() {}
}

module.exports = new ProjectController();
