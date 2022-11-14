import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Cover extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      filename: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      url: {
        type: Sequelize.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      tableName: 'covers',
      paranoid: true
    });
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Movie, { foreignKey: 'movie_id', as: 'movie' });
  }
}

