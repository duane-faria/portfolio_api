const User = require('../model/User');

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['name', 'email', 'username'],
    });
    return res.json(users);
  }

  async store(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
  }
}

module.exports = new UserController();
