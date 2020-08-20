const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');
const fs = require('fs');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let { name, date } = req.body;

      name = name.split(' ').join('');

      const folder = name + '_' + date;

      req.body.folder_name = folder;

      const dir = resolve(__dirname, '..', '..', 'files', 'uploads', folder);

      if (fs.existsSync(dir)) {
        return cb(null, dir);
      }

      fs.mkdirSync(dir);
      return cb(null, dir);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
