const User = require('../models/User').default;
const Watched = require('../models/Watched').default

const index = (filter) => {
  const admin = filter;
  if (!admin) {
    throw new Error('user is not an admin');
  }
  return User.findAll({
    attributes: ['id', 'username', 'email', 'admin', 'total_time', 'most_watched_genre'],
  });
};

const show = (filter) => {
  const { admin, id } = filter;
  const attributes = ['username', 'total_time', 'most_watched_genre', 'id'];

  if (admin) {
    attributes.push('admin', 'email');
  }
  return User.findByPk(id, {
    attributes,
  });
};

const store = async (data) => {
  delete data.confirmPassword;
  const newUser = await User.create(data);
  const { username, email } = newUser;
  return { username, email };
};

const deleteUser = async (userToken, filter) => {
  const user = await User.findByPk(filter.id);

  if (!userToken.admin && !user) {
    throw new Error('you cannot delete other users');
  }

  const userCount = await User.count({ where: { admin: true } });

  if (user.admin && userToken.admin && userCount <= 1) {
    const nextAdmin = await User.findAll({ attributes: ['id'], order: [['id', 'ASC']], raw: true });

    await User.update({ admin: true }, { where: { id: nextAdmin[0].id } });
  }

  await Watched.destroy({
    where: { user_id: filter.id },
  })

  await user.destroy();
  return { deleted: user };
};

const update = async (filter, data) => {
  await User.update(data, { where: { id: filter.id } });

  return data;
};

module.exports = {
  show, deleteUser, store, index, update,
};
