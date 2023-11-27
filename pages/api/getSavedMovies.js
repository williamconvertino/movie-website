import { getSavedMovies } from '@backend/saveMovie_backend';

export default async (req, res) => {

    const userID = req.query.userID;
    const movies = await getSavedMovies(userID);
    res.status(200).json({movies});
}
