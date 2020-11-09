require('dotenv').config();
// module.exports = {
//   dialect: 'mysql',
//   username: 'root',
//   password: 'docker',
//   database: 'portfolio',
//   host: 'localhost',
//   define: {
//     timestamps: true,
//     underscored: true,
//     underscoredAll: true,
//   },
// };

module.exports = {
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: '3306',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    logging: false,
  },
};
