import Cover from "../models/Cover";
import Movie from "../models/Movie"

  const store = async(file, movie_id, actualUser) => {

    if(!file){
      throw new Error('there is no file to be posted')
    }

    if(!actualUser.admin){
      throw new Error('user is not an admin')
    }

    const movie = await Movie.findOne({
      where: {
        id: movie_id,
      },
      raw: true
    })

    if(!movie){
      throw new Error('movie does not exist')
    }
    const cover = await Cover.create({...file, movie_id})

    return cover
  }

  const deleteCover = async(filter, actualUser) => {
    try{

      if(!actualUser.admin){
        throw new Error('user is not an admin')
      }

      const toDeleteCover = await Cover.findByPk(filter.id)
      await toDeleteCover.destroy()
      return{deleted: toDeleteCover}
    }catch(e){
      throw new Error(e)
    }
  }

module.exports = {
  store, deleteCover
}
