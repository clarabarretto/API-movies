import { Model, DataTypes } from 'sequelize';

export default class UserAcessLogs extends Model {
  static init(sequelize) {
    super.init(
      {
        status: {
          type: DataTypes.STRING,
          defaultValue: '',
        },
      },
      {
        sequelize,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}
