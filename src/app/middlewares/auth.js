const auth = require('../../config/auth');
const jwt = require('jsonwebtoken');
const promisify = require('util').promisify;
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = id;
    return next();
  } catch (e) {
    return res.status(404).json({ message: 'Token invalid',catch:true });
  }
};
