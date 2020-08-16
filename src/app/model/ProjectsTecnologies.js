const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class ProjectsTecnologies extends Model {
  static init(sequelize) {
    super.init(
      {
        project_id: Sequelize.INTEGER,
        tecnologie_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
}
module.exports = ProjectsTecnologies;
