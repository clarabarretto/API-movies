const Watched = require('../models/Watched').default;
const Movie = require('../models/Movie').default;
const User = require('../models/User').default;
const {pick, map} = require('lodash')

const index = async (filter) => {
  const attributes = ['rating', 'movie_id'];

  if(filter.id){
    attributes.push('id', 'user_id');
  }

  const watcheds = await Watched.findAll({
    attributes,
    include: [{
      model: Movie,
      attributes: ['name', 'genre', 'time', 'rating'],
    }],
  })

    const watchedsResponse = map(watcheds, watched => pick(watched, ['name', 'genre', 'time', 'rating', 'movie_id','Movie']))

    return watchedsResponse
};

const show = async (userToken) => {
  const attributes = ['rating', 'movie_id', 'user_id'];

  const userWatcheds = await Watched.findAll({
    where: { user_id: userToken.id },
    attributes,
    include: [{
      model: Movie,
      attributes: ['name', 'genre', 'time', 'rating', 'synopsis', 'director'],
    }],
  })
  const userWatchedsResponse = map(userWatcheds, watched => pick(watched,  ['name', 'genre', 'time', 'rating', 'movie_id','Movie']))

  return userWatchedsResponse
};

const allRating = async (data) => {
  const findAllRatings = await Watched.findAll({
    where: { movie_id: data.movie_id },
    attributes: ['rating'],
    raw: true,
  });

  const movieRatigs = { rating: data.rating }
  findAllRatings.push(movieRatigs)

  const reduceRating = findAllRatings.reduce((previousValue, currentValue) => previousValue += currentValue.rating, 0);

  return ~~reduceRating / (~~findAllRatings.length || 0)

};

const allGenre = async (userToken, filter) => {
  const mostRepeatedGenre = {}
  console.log(filter)
  const findAllGenres = await Watched.findAll({
    where: { user_id: userToken.id },
    attributes: [],
    include: [{
      model: Movie,
      attributes: ['genre']
    }],
    raw: true,
    nest: true
  })

  const movie = await Movie.findOne({
    where: { id: filter.movie_id },
    attributes: ['genre'],
    raw: true
  })

  if (!findAllGenres?.length) {
    console.log(findAllGenres)
    return movie.genre
  }

  findAllGenres.forEach(movie => {
    mostRepeatedGenre[movie.Movie.genre] ? mostRepeatedGenre[movie.Movie.genre] = mostRepeatedGenre[movie.Movie.genre] + 1 : mostRepeatedGenre[movie.Movie.genre] = 1
  });

  const mostViewed = Object.keys(mostRepeatedGenre).reduce((previous, after) => mostRepeatedGenre[previous] > mostRepeatedGenre[after] ? previous : after, '');

  return mostViewed
}

const store = async (userToken, data) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    if (userToken.admin) {
      throw new Error('admins cannot add movies to accounts');
    }

    data.user_id = userToken.id;
    const newMovie = await Watched.create(data, { transaction });

    const genreValue = await allGenre(userToken, data)
    const ratingValue = await allRating(data);

    const movieTime = await Movie.findByPk(newMovie.movie_id, {
      attributes: ['time'],
      raw: true
    });

    const timeMovie = movieTime.time + userToken.total_time;

    await User.update({ total_time: timeMovie, most_watched_genre: genreValue }, {
      where: {
        id: userToken.id,
      },
      transaction,
    });

    await Movie.update({ rating: ratingValue }, {
      where: { id: data.movie_id },
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
    throw e
  }
};

const deleteWatched = async (filter, userToken) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    const { movie_id } = filter;
    const watch = await Watched.findOne({
      where: {
        movie_id,
        user_id: userToken.id
      }
    });

    if (userToken.admin || userToken.id !== watch.user_id) {
      console.log(watch.user_id);
      throw new Error('you cannot delete movies from accounts');
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
    console.log(e);
    await transaction.rollback();
    throw e
  }
};

const update = async (filter, data, userToken) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    const { id } = filter;
    const watched = await Watched.findByPk(id, {raw: true});

    if (userToken.admin ||userToken.id !== watched.user_id) {
      throw new Error('you cannot update movies from accounts');
    }

    const ratingValue = await allRating(watched);
    console.log(ratingValue);

    await Promise.all([
      Watched.update(data, {
        where: { id },
        transaction
      }),
      Movie.update({ rating: ratingValue }, {
        where: { id: watched.movie_id },
        transaction,
      })
    ])
    await transaction.commit();
    return { update: watched };
  } catch (e) {
    console.log(e);
    await transaction.rollback();
    throw e
  }
};

module.exports = {
  index, show, store, deleteWatched, update,
};
