const models = require('../model');

class FilesController {
  async store(req, res) {
    return res.json({ files: req.files });
  }
  async delete(req, res) {}
}

module.exports = new FilesController();
