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
  console.log(userToken);
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
  console.log(reduceRating);
};

const store = async (actualUser, data) => {
  const transaction = await Watched.sequelize.transaction();
  try {
    if (actualUser.admin) {
      throw new Error('admins cannot add movies to accounts');
    }

    const ratingValue = await allRating(data);

    console.log(ratingValue, 'esse valor aqui');

    data.user_id = actualUser.id;

    // const newMovie = await Watched.create(data, { transaction });

    // const movieTime = await Movie.findByPk(newMovie.movie_id, {
    //   attributes: ['time'],
    //   raw: true,
    // });

    // console.log(movieTime);
    // const timeMovie = movieTime.time + actualUser.total_time;

    // await User.update({ total_time: timeMovie }, {
    //   where: {
    //     id: actualUser.id,
    //   },
    //   transaction,
    // });

    // await Movie.update({ratingValue}, {
    //   where
    // })

    // console.log;

    // const {
    //   rating, user_id, movie_id,
    // } = newMovie;

    // await transaction.commit();

    // return {
    //   rating, user_id, movie_id,
    // };
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

    await User.update({ time: timeMovie }, {
      where: {
        id: userToken.id,
      },
      transaction,
    });
    console.log('oi');
    await transaction.commit();
    return { deleted: watch };
  } catch (e) {
    // console.log(e);
    await transaction.rollback();
    throw new Error('ERROR');
  }
};

const update = async (filter, data, userToken) => {
  const { id } = filter;
  const movie = await Watched.findByPk(id);

  // fazer transaction alteração do rating

  if (userToken.admin) {
    throw new Error('admins cannot update movies from accounts');
  }

  await movie.update(data);
  return { update: movie };
};

module.exports = {
  index, show, store, deleteWatched, update,
};
