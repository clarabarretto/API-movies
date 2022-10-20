const Cover = require('../models/Cover').default
const Movie = require('../models/Movie').default;
const Watched = require('../models/Watched').default
// const{pick, omit} = require('lodash') // refazer

const index = (filter) => {
  const { admin } = filter;
  const attributes = ['name', 'synopsis', 'director', 'genre', 'time', 'rating', 'id'];

  if (admin) {
    attributes.push('admin_id');
  }

  return Movie.findAll({
    attributes,
  });
};

const show = (filter, userToken) => {
  const id = filter;
  const attributes = ['name', 'synopsis', 'director', 'genre', 'time', 'rating', 'id'];

  if (userToken.admin) {
    attributes.push('admin_id');
  }

  return Movie.findByPk(id, {
    attributes,
  });
};

const store = async (userToken, data) => {

  data.admin_id = userToken.id;
  const newMovie = await Movie.create(data);

  const {
    name, director, genre, time, synopsis, admin_id,
  } = newMovie;

  return {
    name, director, genre, time, synopsis, admin_id,
  };
};

const deleteMovie = async (filter, userToken) => {
  const transaction = await Watched.sequelize.transaction();

  try {
    const { id } = filter;
    const movie = await Movie.findByPk(id);

    await Watched.destroy({
      where: {
        movie_id: id
      },
      transaction
    })
    await Cover.destroy({
      where: {
        movie_id: id
      },
      transaction
    })

    await movie.destroy();
    await transaction.commit();
    return { deleted: movie };

  } catch (e) {
    await transaction.rollback();
    throw e;
  }

};

const update = async (filter, data, userToken) => {
  const { id } = filter;
  return Movie.update(data, {
    where: {
      id
    },
  });

};

module.exports = {
  index, show, store, deleteMovie, update,
};
