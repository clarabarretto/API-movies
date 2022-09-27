import Sequelize, { Model } from 'sequelize';

export default class Movie extends Model {
  static init(sequelize) {
    super.init({

      name: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      synopsis: {
        type: Sequelize.STRING,
      },
      director: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 100],
            msg: 'name must be between three and fifty characters long',
          },
        },
      },
      genre: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      time: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: true,
      },
      admin_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        allowNull: false,
      },
    }, {
      sequelize,
    });
  }
}
