'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'folder_name');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'folder_name');
  },
};
