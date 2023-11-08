import { unsaveMovie } from '@backend/saveMovie_backend';

export default async (req, res) => {

    const userID = req.query.userID;
    const movieID = req.query.movieID;
    await unsaveMovie(userID, movieID);
    res.status(200).json({});
}
