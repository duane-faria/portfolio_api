const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');
const fs = require('fs');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      let { name, date } = req.body;

      name = name.split(' ').join('');

      const folder = name.toLowerCase() + '_' + date;

      req.body.folder_name = folder;

      const dir = resolve(__dirname, '..', '..', 'public', 'uploads', folder);

      if (fs.existsSync(dir)) {
        return cb(null, dir);
      }

      fs.mkdirSync(dir);
      return cb(null, dir);
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);
        file.key = res.toString('hex') + extname(file.originalname);
        return cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3({ apiVersion: '2006-03-01' }),
    bucket: 'dfportfolio2',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) cb(err);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

module.exports = {
  storage: storageTypes.s3,
};
