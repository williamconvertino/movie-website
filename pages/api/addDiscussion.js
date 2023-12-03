// api for adding movie

import { addDiscussion } from '@backend/addDiscussionBackend';

export default async (req, res) => {
    const user = req.query.user;
    const parentDiscussion = req.query.parentDiscussion;
    const content = req.query.content;
    const parentReview = req.query.parentReview;
    
    const newID = await addDiscussion(user, parentReview, parentDiscussion, content);
    res.status(200).json({ discussionID: newID });
    
};
