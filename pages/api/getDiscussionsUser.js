const { getUserDiscussions }  = require("../../backend/discussion_backend.js");

export default async (req, res) => {
        const {userID} = req.query;
        const limit = req.query.limit;
            const discussions = await getUserDiscussions(userID, limit);
            res.status(200).json({discussions: discussions});

    }