import Sequelize, { Model } from 'sequelize';

export default class Watched extends Model {
  static init(sequelize) {
    super.init({
      rating: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
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
}
