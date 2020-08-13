const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class Files extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        project_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
}
module.exports = Files;
