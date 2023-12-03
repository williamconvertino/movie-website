//use function contained in getMovieData.js
const { getMovieData } = require('../../backend/movieData_backend.js');

export default async (req, res) => {  
    const searchQuery = req.query.searchQuery;
    const genre = req.query.genre;
    const startYear = req.query.startYear;
    const endYear = req.query.endYear;
    const sortOption = req.query.sortOption;

    const movieData = await getMovieData(searchQuery, genre, startYear, endYear, sortOption);
    // console.log(movieData)
    //return results
    res.status(200).json({ movieData: movieData });
}