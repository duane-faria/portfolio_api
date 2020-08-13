'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable('users', { id: Sequelize.INTEGER });
    await queryInterface.addColumn('projects', 'folder_name', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('projects', 'folder_name');
  },
};
