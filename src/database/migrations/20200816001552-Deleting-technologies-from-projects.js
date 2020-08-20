'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('projects', 'technologies');
  },

  down: async (queryInterface, Sequelize) => {},
};
