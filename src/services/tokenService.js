const jwt = require('jsonwebtoken');
const { default: UserAcessLogs } = require('../models/UserAcessLog');
const { default: sendEmailService } = require('./sendEmailService');
const { default: userAcessLogsService } = require('./userAcessLogsService');
const User = require('../models/User').default;

const store = async (data) => {
  const { email, password } = data;
  let user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('user does not exist');
  }

  const { id } = user;

  if (!(await user.passwordIsValid(password))) {
    const allowBlockUser = await userAcessLogsService.checkAccessVerification(id);

    if (!allowBlockUser) {

      await UserAcessLogs.create({
        user_id: id,
        status: 'FAIL',
      });

      throw new Error('invalid password');
    }

    await User.update({
      is_blocked: true,
    }, {
      where: {
        id,
      },
    });

    const options = {
      context: {
        user,
        date: moment().format('DD/MM/YYYY [às] HH:mm'),
      },
      subject: 'Usuário Bloqueado',
      template: 'is-blocked',
    };

    await sendEmailService.sendEmail(options, user.email);

    throw new Error('Usuário bloqueado entre em contato com o suporte.');

  };

  user = await User.findOne({ where: { email } });

  if (user.is_blocked) {
    throw ('Usuario bloqueado');
  }

  await UserAcessLogs.create({
    user_id: id,
    status: 'SUCCESS',
  });

  await UserAcessLogs.destroy({
    where: {
      user_id: user.id
    }
  })

  const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });

  const tokenData = { token }

  if (user.admin) {
    tokenData.admin = true
  }

  return tokenData
}

module.exports = {
  store,
};
