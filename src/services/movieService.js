const Cover = require('../models/Cover').default
const Movie = require('../models/Movie').default;
const Watched = require('../models/Watched').default
const { pick, map } = require('lodash')

const index = async (filter) => {
  const attributes = ['name', 'synopsis', 'director', 'genre', 'time', 'rating', 'id']

  if (filter.admin) {
    attributes.push('admin_id', 'deleted_at');
  }
  const movies = await Movie.findAll({
    attributes,
    raw: true
  });

  const movieResponse = map(movies, movie => pick(movie, attributes));
  return movieResponse
};

const show = async (filter, userToken) => {
  const id = filter;
  const attributes = ['name', 'synopsis', 'director', 'genre', 'time', 'rating', 'id'];

  if (userToken.admin) {
    attributes.push('admin_id');
  }

  const movie = await Movie.findByPk(id, {
    attributes,
    raw: true
  });

  return pick(movie, attributes)
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
