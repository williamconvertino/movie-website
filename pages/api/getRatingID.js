import { getRatingID } from '@backend/rating_backend';

export default async (req, res) => {  
    const ratingData = await getRatingID(req.query.userID, req.query.movieID);
    res.status(200).json({ ratingData });
}