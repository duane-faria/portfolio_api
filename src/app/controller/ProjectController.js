class ProjectController {
  async index() {}
  async store(req, res) {
    console.log(req.files);
    return res.json({});
  }
  async update() {}
  async delete() {}
}

module.exports = new ProjectController();
