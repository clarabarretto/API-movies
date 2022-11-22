module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    const addColumnPromises = []
    try {
      addColumnPromises.push(queryInterface.addColumn(
        'users',
        'password_reset_token',
        {
          type: Sequelize.STRING,
          defaultValue: null,
          allowNull: true,
          transaction
        },
      )),
        addColumnPromises.push(queryInterface.addColumn(
          'users',
          'password_reset_expires',
          {
            type: Sequelize.DATE,
            defaultValue: null,
            allowNull: true,
            transaction
          },
        )),
        addColumnPromises.push(queryInterface.addColumn(
          'users',
          'is_blocked',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            allowNull: false,
            transaction
          },
        ))

      await Promise.all(addColumnPromises)
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
  async down(queryInterface) {
    try {
      await Promise.all([
        queryInterface.removeColumn('users', 'password_reset_token'),
        queryInterface.removeColumn('users', 'password_reset_expires'),
        queryInterface.removeColumn('users', 'is_blocked')
      ])
    } catch (e) {
      throw e;
    }

  }
}


