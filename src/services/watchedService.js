const Watched = require('../models/Watched').default;
const Movie = require('../models/Movie').default;
const User = require('../models/User').default;

const index = (filter) => {
  const { admin } = filter;
  const attributes = ['rating', 'movie_id'];
  if (admin) {
    attributes.push('id', 'user_id');
  }
  return Watched.findAll({
    attributes,
    include: [{
      model: Movie,
      attributes: ['name', 'genre', 'time', 'rating'],
    }],
  });
};

const show = (userToken) => {
  const attributes = ['rating', 'movie_id', 'user_id'];
  return Watched.findAll({
    where: { user_id: userToken.id },
    attributes,
    include: [{
      model: Movie,
      attributes: ['name', 'genre', 'time', 'rating', 'synopsis', 'director'],
    }],
  });
};

const allRating = async (data) => {
  const findAllRatings = await Watched.findAll({
    where: { movie_id: data.movie_id },
    attributes: ['rating'],
    raw: true,
  });

  const reduceRating = findAllRatings.reduce((previousValue, currentValue) => previousValue += currentValue.rating, 0);

  console.log(findAllRatings, "AQUI, SOU EU PFVR OLHA AQUI ")
  return ~~reduceRating / ~~findAllRatings.length

};

const allGenre = async (actualUser,data) => {
  const mostRepeatedGenre = {}

  const findAllGenres = await Watched.findAll({
    where: {user_id: actualUser.id},
    attributes: [],
    include: [{
      model: Movie,
      attributes: ['genre']
    }],
    raw: true,
    nest: true
  })

  findAllGenres.forEach(movie => {
    mostRepeatedGenre[movie.Movie.genre] ? mostRepeatedGenre[movie.Movie.genre] = mostRepeatedGenre[movie.Movie.genre] + 1 : mostRepeatedGenre[movie.Movie.genre] = 1
  });

  const mostViewed = Object.keys(mostRepeatedGenre).reduce((previous, after) => mostRepeatedGenre[previous] > mostRepeatedGenre[after] ? previous : after, '');

  return mostViewed
}

const store = async (actualUser, data) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    if (actualUser.admin) {
      throw new Error('admins cannot add movies to accounts');
    }

    const genreValue = await allGenre(actualUser,data)
    const ratingValue = await allRating(data);

    data.user_id = actualUser.id;

    const newMovie = await Watched.create(data);

    const movieTime = await Movie.findByPk(newMovie.movie_id, {
      attributes: ['time'],
      raw: true,
      transaction
    });

    const timeMovie = movieTime.time + actualUser.total_time;

    await User.update({most_watched_genre: genreValue},{
      where:{
        id: actualUser.id,
      },
      transaction,
    })

    await User.update({ total_time: timeMovie }, {
      where: {
        id: actualUser.id,
      },
      transaction,
    });

    await Movie.update({rating: ratingValue}, {
      where: {id: data.movie_id },
      transaction,
    })

    const {
      rating, user_id, movie_id,
    } = newMovie;

    await transaction.commit();

    return {
      rating, user_id, movie_id,
    };
  } catch (e) {
    console.log(e);
    await transaction.rollback();
    throw new Error('ERROR');
  }
};

const deleteWatched = async (filter, userToken) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    const { id } = filter;
    const watch = await Watched.findByPk(id);

    if (userToken.admin) {
      throw new Error('admins cannot delete movies from accounts');
    }

    await watch.destroy({ transaction });

    const movieInfo = await Movie.findByPk(watch.movie_id, {
      attributes: ['time', 'rating'],
      raw: true,
    });

    const timeMovie = userToken.total_time - movieInfo.time;

    await User.update({ total_time: timeMovie }, {
      where: {
        id: userToken.id,
      },
      transaction,
    });

    await transaction.commit();
    return { deleted: watch };
  } catch (e) {
    await transaction.rollback();
    throw new Error('ERROR');
  }
};

const update = async (filter, data, userToken) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    const { id } = filter;
    const movie = await Watched.findByPk(id);

    if (userToken.admin) {
      throw new Error('admins cannot update movies from accounts');
    }

    await Promise.all([movie.update(data), Movie.update(data, {where: {movie_id: movie.id}}, transaction)])
    await transaction.commit();
    return { update: movie };
  }catch(e){
    await transaction.rollback();
    throw new Error('ERROR');
  }
};

module.exports = {
  index, show, store, deleteWatched, update,
};
