const Sequelize = require('sequelize');
const Model = require('sequelize').Model;

class Tecnologies extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      { sequelize }
    );
    return this;
  }
  static associate(models) {
    this.belongsToMany(models.Projects, {
      through: 'ProjectsTecnologies',
      foreignKey: 'tecnologie_id',
    });
  }
}
module.exports = Tecnologies;
