import Cover from "../models/Cover";
import Movie from "../models/Movie"

  const store = async(file, movie_id) => {
    const movie = await Movie.findOne({
      where: {
        id: movie_id,
      },
      raw: true
    })
    console.log(movie)
    if(!movie){
      throw new Error('movie does not exist')
    }
    const cover = await Cover.create({...file, movie_id})

    return cover
  }

  const deleteCover = async(filter) => {
    try{
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
