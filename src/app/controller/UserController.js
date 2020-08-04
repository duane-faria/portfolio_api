const User = require('../model/User');

class UserController {
  async index(req, res) {
    try {
      const user = await User.create({
        name: 'duane1',
        username: 'dafaria1',
        email: 'dwadw1',
        password: 'dwadw1',
      });
      return res.json(user);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new UserController();
