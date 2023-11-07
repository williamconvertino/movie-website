import {
  useEffect,
  useState,
} from 'react';

export default function FeedItem ({ review, handleAddCommentClick}) {
    
    const [userName, setUserName] = useState('Loading...')
    const [movie, setMovie] = useState(null)
    const [rating, setRating] = useState('Loading...')
    
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
    }

    useEffect(() => {
        populateData()
    }, [review])

    
    return(
        <div>
            <div key={review.id} className="conversation">
                <div className="conversation-header">
                    <p>Username: {userName}</p>
                    {movie ? <a href={`/movieprofile?id=${movie.id}`}><p>Movie: {movie.name}</p></a> : <p>"Loading..."</p>}
                    <p>Rating: {rating}</p>
                    <p>Review: {review.content}</p>
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
