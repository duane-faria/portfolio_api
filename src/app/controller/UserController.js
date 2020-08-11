const User = require('../model/User');

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['name', 'email', 'username'],
      });
      return res.json(users);
    } catch (e) {
      console.error(e);
    }
  }

  async store(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
  }
}

module.exports = new UserController();
