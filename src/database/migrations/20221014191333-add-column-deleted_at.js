module.exports = {
  async up (queryInterface, Sequelize) {
    const addColumnPromises = [];

    addColumnPromises.push(queryInterface.addColumn(
      'movies',
      'deleted_at',
      {
        type:Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )),
    addColumnPromises.push(queryInterface.addColumn(
      'users',
      'deleted_at',
      {
        type:Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )),
    addColumnPromises.push(queryInterface.addColumn(
      'watched',
      'deleted_at',
      {
        type:Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )),
    addColumnPromises.push(queryInterface.addColumn(
      'covers',
      'deleted_at',
      {
        type:Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    )),

    await Promise.all(addColumnPromises);
  },

  async down (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await Promise.all([
        queryInterface.removeColumn('movies', 'deleted_at', { transaction }),
        queryInterface.removeColumn('users', 'deleted_at', { transaction }),
        queryInterface.removeColumn('watched', 'deleted_at', { transaction }),
        queryInterface.removeColumn('covers', 'deleted_at', { transaction })
      ])

      await transaction.commit()
    } catch (error) {
      await transaction.rollback();
      throw e;
    }
  }
};
