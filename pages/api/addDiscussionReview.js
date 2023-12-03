// api for adding movie

import { addDiscussionReview } from '@backend/addDiscussionBackend.js';

export default async (req, res) => {
    const user = req.query.user;
    const parent = req.query.parent;
    const content = req.query.content;
    
    const newID = await addDiscussionReview(user, parent, content);
    res.status(200).json({ discussionID: newID });
    
};
