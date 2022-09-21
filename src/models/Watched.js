import Sequelize, { Model } from 'sequelize';

export default class Watched extends Model {
  static init(sequelize) {
    super.init({
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'watched',
      freezeTableName: true,

    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
    this.belongsTo(models.Movie, { foreignKey: 'movie_id' });
  }
}
