import React, {
  useEffect,
  useState,
} from 'react';

import { UserAuth } from '@components/context/AuthContext';
import FeedItem from '@components/feed/FeedItem';
import TopBar from '@components/TopBar';

const HomePage = () => {
    const { user, profile, emailSignUp, emailSignIn, logOut } = UserAuth();

    const [userReviews, setUserReviews] = useState([]);

    const [feedOption, _setFeedOption] = useState("new");

    const [spoilerMode, setSpoilerMode] = useState(true);

    const [ratedMovies, setRatedMovies] = useState([]);

    const toggleSpoilerMode = () => {
        setSpoilerMode(!spoilerMode);
    }

    const setFeedOption = (option) => {
        _setFeedOption(option)
        generateFeed(option)
    }

    const generateFeed = async (option) => {
        const res = await fetch(`/api/getFeed?feedOption=${option}`);
        const feed = await res.json();
        if (feed.data) {
            setUserReviews(feed.data);
        } else {
            setUserReviews([]);
        }
        
    };

    const generateRatedMovies = async () => {
        const res = await fetch(`/api/getRatedMovies?userID=${profile.id}`);
        const ratedMovies = await res.json();
        if (ratedMovies.ratingData) {
            setRatedMovies(ratedMovies.ratingData);
        } else {
            setRatedMovies([]);
        }
    }

    useEffect(() => {
        if (!profile) return;
        generateRatedMovies();
    }, [profile])

    useEffect(() => {
        generateFeed(feedOption);
    }, []);

    return (
        <div>
            <TopBar />
            <div className="conversations-container">
                <h2>Your Feed</h2>
                <div style={{fontStyle: "italic", cursor: 'pointer'}} onClick={toggleSpoilerMode}>Spoilers are {spoilerMode ? 'hidden' : 'shown'}</div>
                <div>
                    <a style={{fontWeight: feedOption == "new" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("new")}}>New </a>
                    <a style={{fontWeight: feedOption == "week" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("week")}}>Top (Week) </a>
                    <a style={{fontWeight: feedOption == "month" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("month")}}>Top (Month) </a>
                    <a style={{fontWeight: feedOption == "all" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("all")}}>Top (All Time) </a>
                    
                </div>
                {userReviews.map((review) => (!spoilerMode || ratedMovies.includes(review.movie)) && <FeedItem  key={review.id}review={review}/>)}
            </div>
        </div>
    );
    };

    export default HomePage;
