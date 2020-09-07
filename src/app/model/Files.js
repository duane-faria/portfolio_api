const Sequelize = require('sequelize');
const { Model } = require('sequelize');
const aws = require('aws-sdk');
const s3 = new aws.S3();
var fs = require('fs');
const path = require('path');

class Files extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: Sequelize.STRING,
        star: Sequelize.BOOLEAN,
        project_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        hooks: {
          beforeDestroy: (file, options) => {
            console.log('before destroy');
            // await s3.deleteObject({
            //   Bucket: 'dfportfolio2',
            //   Key: file.path,
            // }).promise;

            s3.deleteObject(
              {
                Bucket: 'dfportfolio2',
                Key: file.path,
              },
              function (err, data) {
                if (err) console.log(err, err.stack);
                // error
                else console.log('deletado'); // deleted
              }
            );
          },
        },
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Files;
