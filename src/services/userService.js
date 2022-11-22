const User = require('../models/User').default;
const Watched = require('../models/Watched').default
const {pick, map} = require('lodash')
import { Op, where } from "sequelize";

const index = async (filter) => {
  const whereFilter = {}

  if (filter?.username) {
    whereFilter.username = {[Op.iLike]: `%${filter.username}%`}
  }

  return User.findAll({
    attributes: ['id', 'username', 'email', 'admin', 'total_time', 'most_watched_genre'],
    where: whereFilter
  })
}

const show = async (filter) => {
  ;
  const { id } = filter;
  const attributes = ['username', 'total_time', 'most_watched_genre', 'id', 'admin'];

  if (filter.admin) {
    attributes.push('admin', 'email');
  }

  const user = await User.findByPk(id, {
    attributes,
    raw: true
  });

  return pick(user, attributes)
};

const redirectUser = async (filter) => {
  const id = filter;

  const attributes = ['username', 'total_time', 'most_watched_genre', 'id', 'admin'];

  const user = await User.findByPk(id, {
    attributes,
    raw: true
  });

  return pick(user, attributes)
}

const store = async (data) => {
  delete data.confirmPassword;
  const newUser = await User.create(data);
  const { username, email } = newUser;
  return { username, email };
};

const deleteUser = async (userToken, filter) => {
  const filterId = userToken.id

  const user = await User.findByPk(filterId);

  const userCount = await User.count({ where: { admin: true } });

  if (user.admin && userToken.admin && userCount <= 1) {
    const nextAdmin = await User.findAll({ attributes: ['id'], order: [['id', 'ASC']], raw: true });

    await User.update({ admin: true }, { where: { id: nextAdmin[0].id } });
  }

  await Watched.destroy({
    where: { user_id: userToken.id },
  })

  await user.destroy();
  return { deleted: user };
};

const deleteOtherUser = async (filter) => {
  console.log(filter.id);
  const user = await User.findByPk(filter.id);

  await Watched.destroy({
    where: { user_id: filter.id},
  })
  console.log(user);
  await user.destroy();
  return { deleted: user };

}

const update = async (userToken, data) => {
  await User.update(data, { where: { id: userToken.id } });

  return data;
};

const makeAdmin = async (userToken, data, filter) => {
  await User.update(data, { where: {id: filter.id}})

  return data
}

module.exports = {
  show, deleteUser, store, index, update, redirectUser, deleteOtherUser, makeAdmin
};
