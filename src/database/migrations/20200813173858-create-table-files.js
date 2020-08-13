module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      path: { type: Sequelize.STRING, allowNull: false },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projects',
          key: 'id',
        },
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('files');
  },
};
