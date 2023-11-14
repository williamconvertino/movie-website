import {
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';

import { UserAuth } from '@components/context/AuthContext';

export default function FeedItem ({ review, handleAddCommentClick}) {
    
    const [userName, setUserName] = useState('Loading...')
    const [movie, setMovie] = useState(null)
    const [rating, setRating] = useState('Loading...')
    const [time, setTime] = useState('Loading...')
    const [numLikes, setNumLikes] = useState(review.numLikes)
    const [numDislikes, setNumDislikes] = useState(review.numLikes)
    
    const [likeState, setLikeState] = useState(0)

    const {user, profile} = UserAuth()

    const populateData = async () => {
    
        const res = await fetch(`/api/getUserID?userID=${review.user}`)
        const data = await res.json()
        const user = data.userData
        
        setUserName(user.username);
        
        res = await fetch(`/api/getMovieID?movieID=${review.movie}`)
        data = await res.json()
        setMovie(data.movieData);

        res = await fetch(`/api/getRatingID?userID=${review.user}&movieID=${review.movie}`)
        data = await res.json()
        const rating = data.ratingData
        if (rating == null) {
            setRating('No rating given');
        } else {
            setRating(rating.rating);
        }
        
        const daysAgo = Math.floor((Date.now() - (review.DateTimeCreated.seconds*1000)) / (1000 * 60 * 60 * 24));
        if (daysAgo < 1) {
            setTime('Today')
        } else if (daysAgo == 1) {
            setTime('Yesterday')
        } else {
            setTime(`${daysAgo} days ago`)
        }

    }

    const generateLikeValue = async () => {
        if (!profile) return
        let newLikeState = Cookies.get(`user-${profile.id}&review-${review.id}`)
        if (!newLikeState) newLikeState = 0
        setLikeState(newLikeState)
    }

    const ToggleLike = async () => {
        if (!profile) return;
        
        let likeValue = Cookies.get(`user-${profile.id}&review-${review.id}`)

        if (likeValue == 1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 0)
            setNumLikes(numLikes - 1)
            setLikeState(0)
        } else if (likeValue == -1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 1)
            setNumLikes(numLikes + 1)
            setNumDislikes(numDislikes - 1)
            setLikeState(1)
        } else {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 1)
            setNumLikes(numLikes + 1)
            setLikeState(1)
        }

    }

    const ToggleDislike = async () => {
        if (!profile) return;

        let likeValue = Cookies.get(`user-${profile.id}&review-${review.id}`)

        if (likeValue == -1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 0)
            setNumDislikes(numDislikes - 1)
            setLikeState(0)
        } else if (likeValue == 1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, -1)
            setNumLikes(numLikes - 1)
            setNumDislikes(numDislikes + 1)
            setLikeState(-1)
        } else {
            Cookies.set(`user-${profile.id}&review-${review.id}`, -1)
            setNumDislikes(numDislikes + 1)
            setLikeState(-1)
        }
    }

    useEffect(() => {
        populateData()
    }, [review])

    useEffect(() => {
        generateLikeValue()
    }, [profile])
    
    return(
        <div>
            <div key={review.id} className="conversation">
                <div className="conversation-header">
                    <p>Username: {userName}</p>
                    {movie ? <a href={`/movieprofile?movieID=${movie.id}`}><p>Movie: {movie.name}</p></a> : <p>"Loading..."</p>}
                    <p>Rating: {rating}</p>
                    <p>Review: {review.content}</p>
                    <p>{time}</p>
                    <div> 
                        <div style={{cursor: "pointer"}} onClick={ToggleLike}>{numLikes} likes</div> 
                        <div style={{cursor: "pointer"}} onClick={ToggleDislike}>{numDislikes} dislikes</div>
                    </div>
                    <p>{likeState == 1 && "(Liked)"}</p>
                    <p>{likeState == -1 && "(Disliked)"}</p>
                </div>
                {/* <ul>
                    {review.comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.user}:</strong> {comment.text}
                    </li>
                    ))}
                </ul> */}
                {/* <button onClick={() => handleAddCommentClick(review.id)}>
                    Add Comment
                </button> */}
            </div>
        </div>
    )
}
