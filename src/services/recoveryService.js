import crypto from 'crypto';
import moment from 'moment';
import { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
import sendEmailService from './sendEmailService';
import User from '../models/User'

class RecoveryService {
  async recovery(data) {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
      attributes: ['id', 'username', 'email'],
      raw: true,
    });

    if (!user) {
      throw new Error('user does not exist.');
    }

    const token = crypto.randomBytes(20).toString('hex');

    await User.update({
      password_reset_token: token,
      password_reset_expires: moment().add(1, 'day').toISOString(),
    }, {
      where: {
        id: user.id,
      },
    });

    await sendEmailService.sendEmail({
      context: {
        user,
        token,
      },
      subject: 'Recuperação de senha',
      template: 'recover-password',
    }, user.email);

    return true;
  }

  async validateToken(token) {
    console.log(moment(), 'moment')
    console.log(token, 'token')

    const hasToken = await User.findOne({
      where: {
        password_reset_token: token,
        password_reset_expires: {
          [Op.gt]: moment(),
        },
      },
      attributes: ['username', 'email'],
      raw: true,
    });

    if (!hasToken) {
      throw new Error('There is no token.');
    }

    return hasToken;
  }

  async changePassword(data, token, ip) {
    const user = await this.validateToken(token);

    const changes = {
      password_reset_token: null,
      password_reset_expires: null,
      is_blocked: false,
    };

    changes.password_hash = await bcryptjs.hash(data.password, 8);

    await User.update(changes, {
      where: {
        password_reset_token: token,
      },
    });

    const options = {
      context: {
        user,
        date: moment().format('DD/MM/YYYY [às] HH:mm'),
        ip,
      },
      subject: 'Senha alterada',
      template: 'change-password',
    };

    await sendEmailService.sendEmail(options, user.email);

    return true;
  }
}

export default new RecoveryService();
