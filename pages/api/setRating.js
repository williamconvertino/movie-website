import { setRatingID } from '@backend/rating_backend';

export default async (req, res) => {  
    
    const {userID, movieID, rating} = req.query;
    await setRatingID(userID, movieID, rating);

    res.status(200).json({});
}