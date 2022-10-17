import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'invalid Email',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
      },
      total_time: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      most_watched_genre: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      paranoid: true
    });
    this.addHook('beforeSave', async (user) => {
      if (user.password) { user.password_hash = await bcryptjs.hash(user.password, 8); }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
