import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import DiscussionBlock from '@components/DiscussionBlock';
import FeedItem from '@components/feed/FeedItem';
import ReplyButton from '@components/ReplyButton';
import TopBar from '@components/TopBar';

const HomePage = () => {
    
    const { user, emailSignUp, emailSignIn, logOut } = UserAuth();
    
    const router = useRouter()
    const {reviewID} = router.query;
    
    const [review, setReview] = useState(null);

    const [discussions, setDiscussions] = useState([]);

    const populateData = async () => {
        if (!reviewID) return;
        const resp = await fetch(`/api/getReviewID?reviewID=${reviewID}`)
        const data = await resp.json()
        setReview(data.reviewData);

        const resp2 = await fetch(`/api/getDiscussionsReview?reviewID=${reviewID}&limit=10`)
        const data2 = await resp2.json()
        setDiscussions(data2.discussionData);

    }


    useEffect(() => {
        populateData()
    }, [reviewID]);
    
    return (
        <div>
            <TopBar />
            
            <div className="movie-profile">
                <div className="movie-details">
                    {review ? <FeedItem review={review} clickable={false} /> : "Loading..."}
                    <div><ReplyButton parentReview={reviewID} text='Add new discussion' refresh={populateData}/> </div>
                
                </div>
                
                
                <div className="movie-details">
                    Discussion:
                    {discussions.map((discussion) => <DiscussionBlock parentReview={review.id} key={discussion.id} discussion={discussion} />)}
                </div>
            </div>
        </div>
    );
    };

    export default HomePage;
