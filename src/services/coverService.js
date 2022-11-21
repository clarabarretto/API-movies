import { throttle, pick } from "lodash";
import { Op, where } from "sequelize";
import Cover from "../models/Cover";
import Movie from "../models/Movie"
import Watched from "../models/Watched"
import handleCreate from "./handlesUtils"

const storeService = async (req) => {
  // const { id } = req.params;
  const { name } = req.body;

  const foto = await handleCreate(images, {
    url: `/views/images/${name}`,
    ...req.body,
  });

  return foto;
};

const store = async (file, movie_id, actualUser) => {
  try {
    const movie = await Movie.findOne({
      where: {
        id: movie_id,
      },
      raw: true
    })

    if (!movie) {
      throw new Error('movie does not exist')
    }
    return Cover.create({ ...file, movie_id })

  } catch (error) {
    console.log(error);
  }
}

const deleteCover = async (filter, actualUser) => {
  try {
    const toDeleteCover = await Cover.findByPk(filter.id)
    await toDeleteCover.destroy()

    return { deleted: toDeleteCover }
  } catch (e) {
    throw e
  }
}

const show = (id) => {
    return Cover.findOne({
      attributes: ['filename'],
      where: {
          movie_id: id
      },
      include: {
          model: Movie,
          where: {
              id: id
          },
          as: 'movie'
      }
  });
}

const getCoverUsers = async (userToken) => {
  const attributes = ['rating', 'movie_id', 'user_id'];

  const allUserMovies = await Watched.findAll({
    where: { user_id: userToken.id },
    attributes,
    include: [{
      model: Movie,
      attributes: ['name', 'genre', 'time', 'rating', 'synopsis', 'director'],
    }],
    raw: true,
    nest:true
  })

  const movieIds = allUserMovies.map(watch => watch.movie_id)

  const allImages = await Cover.findAll({
    where: {
      movie_id: movieIds
    },
    raw: true
  })

  return {
    allUserMovies,
    allImages
  }
}

const getCoveOtherUsers = async (userId) => {
  const attributes = ['rating', 'movie_id', 'user_id'];

  const allUserMovies = await Watched.findAll({
    where: { user_id: userId },
    attributes,
    include: [{
      model: Movie,
      attributes: ['name', 'genre', 'time', 'rating', 'synopsis', 'director'],
    }],
    raw: true,
    nest:true
  })

  const movieIds = allUserMovies.map(watch => watch.movie_id)

  const allImages = await Cover.findAll({
    where: {
      movie_id: movieIds
    },
    raw: true
  })

  return {
    allUserMovies,
    allImages
  }
}

const allCovers = filter => {
  const whereFilter = {};

    if (filter?.name) {
      whereFilter.name = {[Op.iLike]: `%${filter.name}%`}
    }

    return Cover.findAll({
      attributes: ['filename'],
      include: {
          model: Movie,
          as: 'movie',
          where: whereFilter
      },
      limit:20,
      order: [['movie' ,'rating', 'desc']]
  });
}

module.exports = {
  store, deleteCover, show, allCovers, getCoverUsers, getCoveOtherUsers, storeService
}
