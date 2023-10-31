// api/autocompleteMovies.js
import { getMovieData } from '../../backend/movieData_backend.js';

export default async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const autocompleteResults = await getMovieData(searchQuery);
  res.status(200).json({ movieData: autocompleteResults });
};
