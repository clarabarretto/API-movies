import Sequelize, { Model } from 'sequelize';

export default class UserAcessLog extends Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        tableName: 'user_acess_logs'
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
