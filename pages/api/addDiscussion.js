// api for adding movie

import { addDiscussion } from '@backend/addDiscussionBackend';

export default async (req, res) => {
    const user = req.query.user;
    const parent = req.query.parent;
    const content = req.query.content;
    
    const newID = await addDiscussion(user, parent, content);
    res.status(200).json({ discussionID: newID });
    
};
