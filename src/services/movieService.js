const Movie = require('../models/Movie').default;

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
  console.log(id);
  const attributes = ['name', 'synopsis', 'director', 'genre', 'time', 'rating', 'id'];
  if (userToken.admin) {
    attributes.push('admin_id');
  }
  return Movie.findByPk(id, {
    attributes,
  });
};

const store = async (actualUser, data) => {
  if (!actualUser.admin) {
    throw new Error('user is not an admin');
  }

  data.admin_id = actualUser.id;
  // console.log(data);
  const newMovie = await Movie.create(data);
  const {
    name, director, genre, time, synopsis, admin_id,
  } = newMovie;

  return {
    name, director, genre, time, synopsis, admin_id,
  };
};

const deleteMovie = async (filter, userToken) => {
  const { id } = filter;
  const movie = await Movie.findByPk(id);

  if (!userToken.admin) {
    throw new Error('you cannot delete movies');
  }

  await movie.destroy();
  return { deleted: movie };
};

const update = async (filter, data, userToken) => {
  const { id } = filter;
  const movie = await Movie.findByPk(id);

  if (!userToken.admin) {
    throw new Error('you cannot update movies');
  }

  await movie.update(data);
  return { updated: movie };
};

module.exports = {
  index, show, store, deleteMovie, update,
};
