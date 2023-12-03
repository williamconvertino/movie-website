import React, {
  useEffect,
  useState,
} from 'react';

import { UserAuth } from '@components/context/AuthContext';
import FeedItem from '@components/feed/FeedItem';
import TopBar from '@components/TopBar';

const HomePage = () => {
    const { user, emailSignUp, emailSignIn, logOut } = UserAuth();

    const [userReviews, setUserReviews] = useState([]);

    const [feedOption, _setFeedOption] = useState("new");

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

    useEffect(() => {
        generateFeed(feedOption);
    }, []);

    return (
        <div>
            <TopBar />
            <div className="conversations-container">
                <h2>Your Feed</h2>
                <div>
                    <a style={{fontWeight: feedOption == "new" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("new")}}>New </a>
                    <a style={{fontWeight: feedOption == "week" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("week")}}>Top (Week) </a>
                    <a style={{fontWeight: feedOption == "month" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("month")}}>Top (Month) </a>
                    <a style={{fontWeight: feedOption == "all" ? "bold" : "initial", cursor:"pointer"}} onClick={() => {setFeedOption("all")}}>Top (All Time) </a>
                    
                </div>
                {userReviews.map((review) => (<div key={review.id}><FeedItem review={review}/></div>))}
            </div>
        </div>
    );
    };

    export default HomePage;
