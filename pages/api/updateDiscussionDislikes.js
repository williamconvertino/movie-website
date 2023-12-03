import { updateDiscussionDislike } from '@backend/discussion_like_backend';

export default async (req, res) => {  
    
    const {discussionID, likeValue} = req.query;
    await updateDiscussionDislike(discussionID, likeValue);

    res.status(200).json({});
}