'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'tecnologies');
  },

  down: async (queryInterface, Sequelize) => {},
};
