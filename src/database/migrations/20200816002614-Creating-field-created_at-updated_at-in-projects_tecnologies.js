'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'projects_tecnologies',
      'created_at',
      Sequelize.DATE
    );
    await queryInterface.addColumn(
      'projects_tecnologies',
      'updated_at',
      Sequelize.DATE
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects_tecnologies', 'created_at');
    await queryInterface.removeColumn('projects_tecnologies', 'updated_at');
  },
};
