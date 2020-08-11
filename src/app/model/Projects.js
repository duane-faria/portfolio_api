const Sequelize = require('sequelize');
const Model = require('sequelize').Model;

class Projects extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        tecnologies: Sequelize.STRING,
        link: Sequelize.STRING,
        date: Sequelize.DATE,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
}
module.exports = Projects;
