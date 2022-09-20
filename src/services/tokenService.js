const jwt = require('jsonwebtoken');
const User = require('../models/User').default;

const store = async (data) => {
  const { email, password, admin } = data;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('user does not exist');
  }

  if (!(await user.passwordIsValid(password))) {
    throw new Error('invalid password');
  }

  const { id } = user;

  const token = jwt.sign({ id, email, admin }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION,
  });
  return token;
};

module.exports = {
  store,
};
