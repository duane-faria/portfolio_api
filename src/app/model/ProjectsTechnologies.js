const Sequelize = require('sequelize');
const { Model } = require('sequelize');

class ProjectsTechnologies extends Model {
  static init(sequelize) {
    super.init(
      {
        project_id: Sequelize.INTEGER,
        technologie_id: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
}
module.exports = ProjectsTechnologies;
