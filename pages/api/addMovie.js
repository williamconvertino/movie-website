// api for adding movie

import addMovie from "../../backend/addMovie_backend.js";

export default async (req, res) => {
    const movie = {
        title: req.query.title,
        genre: req.query.genre,
        year: req.query.year,
        //Other stuff here idk what else
    };

    try {
        const movieId = await addMovie(movie);
        res.status(200).json({ message: "movie added succesfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to add movie." });
    }
};
