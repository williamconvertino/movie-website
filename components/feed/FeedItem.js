import {
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import StarRating from '@components/StarRating';

export default function FeedItem ({ review, clickable=true }) {
    
    const router = useRouter()

    const [userName, setUserName] = useState('Loading...');
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState('Loading...');
    const [time, setTime] = useState('Loading...');
    const [numLikes, setNumLikes] = useState(review.numLikes)
    const [numDislikes, setNumDislikes] = useState(review.numDislikes)
    const [commentText, setCommentText] = useState('');
    const [showAddComment, setShowAddComment] = useState(false);
    
    const [commentsVisible, setCommentsVisible] = useState(false);

    const toggleCommentsVisibility = () => {
        setCommentsVisible(!commentsVisible);
    };

    const handleAddComment = () => {
        setShowAddComment(true);
    };

    //not too sure how to handle the handleAddCommentClick
    const handleSubmitComment = () => {
        /*handleAddCommentClick(review, {
          user: userName, 
          text: commentText,
        });*/
    
        // Reset the comment text and hide the comment input
        setCommentText('');
        setShowAddComment(false);
    };
    const [likeState, setLikeState] = useState(0)

    const {user, profile} = UserAuth()

    const populateData = async () => {
        if (!review.user) return
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
            await fetch(`/api/updateReviewLikes?reviewID=${review.id}&likeValue=-1`)
        } else if (likeValue == -1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 1)
            setNumLikes(numLikes + 1)
            setNumDislikes(numDislikes - 1)
            setLikeState(1)
            await fetch(`/api/updateReviewLikes?reviewID=${review.id}&likeValue=1`)
            await fetch(`/api/updateReviewDislikes?reviewID=${review.id}&likeValue=-1`)
        } else {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 1)
            setNumLikes(numLikes + 1)
            setLikeState(1)
            await fetch(`/api/updateReviewLikes?reviewID=${review.id}&likeValue=1`)
        }

    }

    const ToggleDislike = async () => {
        if (!profile) return;

        let likeValue = Cookies.get(`user-${profile.id}&review-${review.id}`)

        if (likeValue == -1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, 0)
            setNumDislikes(numDislikes - 1)
            setLikeState(0)
            await fetch(`/api/updateReviewDislikes?reviewID=${review.id}&likeValue=-1`)
        } else if (likeValue == 1) {
            Cookies.set(`user-${profile.id}&review-${review.id}`, -1)
            setNumLikes(numLikes - 1)
            setNumDislikes(numDislikes + 1)
            setLikeState(-1)
            await fetch(`/api/updateReviewLikes?reviewID=${review.id}&likeValue=-1`)
            await fetch(`/api/updateReviewDislikes?reviewID=${review.id}&likeValue=1`)
        } else {
            Cookies.set(`user-${profile.id}&review-${review.id}`, -1)
            setNumDislikes(numDislikes + 1)
            setLikeState(-1)
            await fetch(`/api/updateReviewDislikes?reviewID=${review.id}&likeValue=1`)
        }
    }

    useEffect(() => {
        populateData()
    }, [review])

    useEffect(() => {
        generateLikeValue()
    }, [profile])
    
    return(
        <div style={{cursor: clickable ? "pointer" : "initial"}} onClick={() => clickable ? router.push(`/review?reviewID=${review.id}`) : null}>
            <div key={review.id} className="conversation">
                <div className="conversation-header">
                    <p>Username: {userName}</p>
                    {movie ? <a href={`/movieprofile?movieID=${movie.id}`}><p>Movie: {movie.name}</p></a> : <p>"Loading..."</p>}
                    <p>Rating: <StarRating rating={rating}/></p>
                    <p>Review: {review.content}</p>
                    <p>{time}</p>
                    <div> 
                        <a style={{cursor: "pointer", fontWeight: likeState == 1 ? "bold" : "lighter"}} onClick={ToggleLike}>{numLikes} likes </a> 
                        
                        <a style={{cursor: "pointer", fontWeight: likeState == -1 ? "bold" : "lighter"}} onClick={ToggleDislike}>{numDislikes} dislikes</a>
                    </div>
                    

                    {/* <button className="toggle-comments" onClick={toggleCommentsVisibility}>
                        {commentsVisible ? 'Hide Comments' : 'Show Comments'}
                    </button>
                    <button onClick={handleAddComment}>Add Comment</button> */}
                </div>

                {showAddComment && (
                    <div>
                        <textarea
                        placeholder="Add your comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={handleSubmitComment}>Submit Comment</button>
                    </div>
                )}

                {commentsVisible && (
                    <div className="comment-section">
                        <ul>
                        {review.comments?.map((comment) => (
                            <li key={comment.id}>
                            <strong>{comment.user}:</strong> {comment.text}
                            </li>
                        ))}
                        </ul>
                    </div>
                )}
                
                {<ul>
                    {review.comments && review.comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.user}:</strong> {comment.text}
                    </li>
                    ))}
                </ul>}
            </div>
        </div>
    )
}
