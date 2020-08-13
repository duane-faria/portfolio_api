const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');
const fs = require('fs');

module.exports = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let { name, date } = req.body;

      // date = Date.now();
      name = name.split(' ').join('');

      const folder = name + '_' + date;

      req.body.folder_name = folder;

      const dir = resolve(__dirname, '..', '..', 'files', 'uploads', folder);

      fs.exists(dir, (exist) => {
        if (!exist) {
          return fs.mkdir(dir, (error) => cb(error, dir));
        }
        return cb(null, dir);
      });
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
