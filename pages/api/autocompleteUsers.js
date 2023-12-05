// api/autocompleteMovies.js
import { getUserData } from '../../backend/userData_backend.js';

export default async (req, res) => {
  const searchQuery = req.query.searchQuery;
  const autocompleteResults = await getUserData(searchQuery);
  res.status(200).json({ movieData: autocompleteResults });
};
