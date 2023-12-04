import { getRatedMovies } from '@backend/getRatedMovies';

export default async (req, res) => {  
    const ratingData = await getRatedMovies(req.query.userID);
    res.status(200).json({ ratingData: ratingData });
}