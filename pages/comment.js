import React, {
    useEffect,
    useState,
  } from 'react';
  
  import { useRouter } from 'next/router';
  
  //import { UserAuth } from '@components/context/AuthContext';
  import TopBar from '@components/TopBar';
  
  export default function CommentPage() {
  
    //const {user, profile, emailSignUp, emailSignIn, logOut} = UserAuth()
  
    const router = useRouter()
    const {movieID} = router.query
  
    const [movie, setMovie] = useState(null);
    //const [rating, setRating] = useState(null);
    const [content, setContent] = useState("");
  
    const [loadState, setLoadState] = useState("loading");
    const [submitState, setSubmitState] = useState("idle");
  
    const handleSubmit = async (e) => {
      
      if (e) {
        e.preventDefault();
      }
  
      if (content.length < 1) {
        return
      }
  
      if (!movie || !user) {
        throw new Error("Movie not loaded...")
        return
      }
  
      if (loadState != "ready") {
        setSubmitState("ready")
        return
      }
  
      /*fetch(`/api/newComment?movieID=${movie.id}&content=${content}&userID=${user.uid}`)
          .then((response) => response.json())
          .then((data) => {
            router.push(`/movieprofile?movieID=${movie.id}`)
          })
          .catch((error) => {
              console.error('Error fetching search results:', error);
      });*/
  
    }
  
    const loadMovie = async () => {
      if (!movieID) return;
      
      fetch(`/api/getMovieID?movieID=${movieID}`)
          .then((response) => response.json())
          .then((data) => {
              setMovie(data.movieData);
  
              setLoadState("ready")
  
              if (submitState == "ready") {
                handleSubmit()
              }
  
          })
          .catch((error) => {
              console.error('Error fetching search results:', error);
          });
    }
  
    const loadComment = async () => {
  
    }
  
    useEffect(() => {
      loadMovie()
      loadComment()
    }, [movieID])
  
    return (
      <div>
        <TopBar />
        <div className="review-page">
        <br></br>
        <br></br>
        <h1>{movie ? `New comment for "${movie.name}"` : "Loading..."}</h1>
        
        <form onSubmit={handleSubmit}>
            {}
          
            <textarea
              placeholder="How was the movie?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
  
          <button type="submit">Submit Comment</button>
        </form>
        {}
        </div>
      </div>
    );
  }
  