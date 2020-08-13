const Sequelize = require('sequelize');
const Model = require('sequelize').Model;

class Projects extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        description: Sequelize.STRING,
        tecnologies: Sequelize.STRING,
        folder_name: Sequelize.STRING,
        link: Sequelize.STRING,
        date: Sequelize.DATE,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Files);
  }
}
module.exports = Projects;
