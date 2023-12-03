// api for adding movie

import { addMovie } from '../../backend/addMovie_backend.js';

export default async (req, res) => {
    const title = req.query.title;
    const genres = req.query.genres;
    const year = req.query.year;
    const imdbID = req.query.imdbID

    const newID = await addMovie(title, genres, year, imdbID);
    res.status(200).json({ movieID: newID });
    
};
