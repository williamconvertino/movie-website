import React, {
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';

import { UserAuth } from './context/AuthContext';

export default function DiscussionBlock ({ discussion, level=0 }) {
    
    let leftMargin = "0px"

    if (level < 4) {
        leftMargin = "20px"
    }

    if (level == 0) {
        leftMargin = "-60px"
    }

    const [discussionUser, setDiscussionUser] = useState('Loading...');

    const [replies, setReplies] = useState([]);

    const [likeState, setLikeState] = useState(0)

    const {user, profile} = UserAuth()

    const [numLikes, setNumLikes] = useState(discussion.numLikes)
    const [numDislikes, setNumDislikes] = useState(discussion.numDislikes)

    const populateData = async () => {
        if (!discussion.user) return;
        const resp = await fetch(`/api/getUserID?userID=${discussion.user}`)
        const data = await resp.json()
        setDiscussionUser(data.userData);

        const resp2 = await fetch(`/api/getDiscussionsParent?parentID=${discussion.id}&limit=10`)
        const data2 = await resp2.json()
        setReplies(data2.discussionData);
    }

    useEffect(() => {
        populateData()
    }, [discussion]);

    useEffect(() => {
        generateLikeValue()
    }, [profile])


    const generateLikeValue = async () => {
        if (!profile) return
        let newLikeState = Cookies.get(`user-${profile.id}&discussion-${discussion.id}`)
        if (!newLikeState) newLikeState = 0
        setLikeState(newLikeState)
    }

    const ToggleLike = async () => {
        if (!profile) return;
        
        let likeValue = Cookies.get(`user-${profile.id}&discussion-${discussion.id}`)

        if (likeValue == 1) {
            Cookies.set(`user-${profile.id}&discussion-${discussion.id}`, 0)
            setNumLikes(numLikes - 1)
            setLikeState(0)
            await fetch(`/api/updateDiscussionLikes?discussionID=${discussion.id}&likeValue=-1`)
        } else if (likeValue == -1) {
            Cookies.set(`user-${profile.id}&discussion-${discussion.id}`, 1)
            setNumLikes(numLikes + 1)
            setNumDislikes(numDislikes - 1)
            setLikeState(1)
            await fetch(`/api/updateDiscussionLikes?discussionID=${discussion.id}&likeValue=1`)
            await fetch(`/api/updateDiscussionDislikes?discussionID=${discussion.id}&likeValue=-1`)
        } else {
            Cookies.set(`user-${profile.id}&discussion-${discussion.id}`, 1)
            setNumLikes(numLikes + 1)
            setLikeState(1)
            await fetch(`/api/updateDiscussionLikes?discussionID=${discussion.id}&likeValue=1`)
        }

    }

    const ToggleDislike = async () => {
        if (!profile) return;

        let likeValue = Cookies.get(`user-${profile.id}&discussion-${discussion.id}`)

        if (likeValue == -1) {
            Cookies.set(`user-${profile.id}&discussion-${discussion.id}`, 0)
            setNumDislikes(numDislikes - 1)
            setLikeState(0)
            await fetch(`/api/updateDiscussionDislikes?discussionID=${discussion.id}&likeValue=-1`)
        } else if (likeValue == 1) {
            Cookies.set(`user-${profile.id}&discussion-${discussion.id}`, -1)
            setNumLikes(numLikes - 1)
            setNumDislikes(numDislikes + 1)
            setLikeState(-1)
            await fetch(`/api/updateDiscussionLikes?discussionID=${discussion.id}&likeValue=-1`)
            await fetch(`/api/updateDiscussionDislikes?discussionID=${discussion.id}&likeValue=1`)
        } else {
            Cookies.set(`user-${profile.id}&discussion-${discussion.id}`, -1)
            setNumDislikes(numDislikes + 1)
            setLikeState(-1)
            await fetch(`/api/updateDiscussionDislikes?discussionID=${discussion.id}&likeValue=1`)
        }
    }


    return  <div className="conversation" style={{marginLeft: leftMargin}}>
            <p style={{fontStyle: "italic"}}>
                {discussionUser ? discussionUser.username : "Loading..."}
            </p>
            {discussion.content}
            <div> 
                        <a style={{cursor: "pointer", fontWeight: likeState == 1 ? "bold" : "lighter"}} onClick={ToggleLike}>{numLikes} likes </a> 
                        
                        <a style={{cursor: "pointer", fontWeight: likeState == -1 ? "bold" : "lighter"}} onClick={ToggleDislike}>{numDislikes} dislikes</a>
            </div>
            
            {replies.map((reply) => <DiscussionBlock key={reply.id} discussion={reply} level={level+1} />)}

        </div>
    
}