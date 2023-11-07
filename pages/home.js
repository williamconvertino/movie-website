import React, {
  useEffect,
  useState,
} from 'react';

import { UserAuth } from '@components/context/AuthContext';
import FeedItem from '@components/feed/FeedItem';
import TopBar from '@components/TopBar';

const HomePage = () => {
    // Destructuring values from the UserAuth context
    const { user, emailSignUp, emailSignIn, logOut } = UserAuth();

    // State for storing reviews
    const [userReviews, setUserReviews] = useState([]);

    // State for managing selected review and new comment
    const [selectedReview, setSelectedReview] = useState(null);
    const [newComment, setNewComment] = useState('');

    // Function to handle "Add Comment" button click
    const handleAddCommentClick = (reviewId) => {
        setSelectedReview(reviewId);
    };

    // Function to handle "Back to Home" button click
    const handleBackToHomePage = () => {
        setSelectedReview(null);
        setNewComment('');
    };

  // Function to handle comment submission
    // const handleCommentSubmit = () => {
    //     if (newComment.trim() !== '') {
    //     // Find the review by reviewId
    //     const updatedReviews = userReviews.map((review) => {
    //         if (review.id === selectedReview) {
    //             review.comments.push({
    //             id: review.comments.length + 1,
    //             username: user.username, // Replace with the actual username
    //             text: newComment,
    //             });
    //         }
    //         return review;
    //     });

    //     setUserReviews(updatedReviews);
    //     setNewComment('');
    //     }
    // };

  // Function to fetch and update user reviews
    const generateFeed = async () => {
        try {
            const res = await fetch('/api/getFeed');
            const feed = await res.json();

            if (feed.data) {
                setUserReviews(feed.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        generateFeed();
    }, []);

    return (
        <div>
            <TopBar />
            <div className="conversations-container">
                <h2>Your Feed</h2>
                {userReviews.map((review) => (<div key={review.id}><FeedItem review={review}/></div>))}
            </div>
        </div>
    );
    };

    export default HomePage;
