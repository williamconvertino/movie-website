import { saveMovie } from '@backend/saveMovie_backend';

export default async (req, res) => {

    const userID = req.query.userID;
    const movieID = req.query.movieID;
    await saveMovie(userID, movieID);
    res.status(200).json({});
}
