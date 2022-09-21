module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('watched', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },

      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'movies', key: 'id' },
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('watched');
  },
};
