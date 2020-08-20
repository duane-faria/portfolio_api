'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'projects_technologies',
      'created_at',
      Sequelize.DATE
    );
    await queryInterface.addColumn(
      'projects_technologies',
      'updated_at',
      Sequelize.DATE
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects_technologies', 'created_at');
    await queryInterface.removeColumn('projects_technologies', 'updated_at');
  },
};
