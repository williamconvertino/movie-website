const {removeDiscussion} = require('../../backend/discussion_backend.js');

export default async (req, res) => {
    const discussionID = req.query.discussionID;
    try{
        await removeDiscussion(discussionID);
        res.status(200).json({message: "Discussion removed succesfully."});
    }catch(error){
        res.status(500).json({error: "Discussion not removed."});
    }
}