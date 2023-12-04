import {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/router';

import { UserAuth } from '@components/context/AuthContext';
import DiscussionBlock from '@components/DiscussionBlock';
import FeedItem from '@components/feed/FeedItem';
import TopBar from '@components/TopBar';

export default function Reports () {

    const [admin, setAdmin] = useState(false)

    const { user, profile } = UserAuth();
    const router = useRouter();

    const [reportedReviews, setReportedReviews] = useState([]);
    const [reportedDiscussions, setReportedDiscussions] = useState([]);

    const populateReported = async () => {
        const res = await fetch(`/api/getReportedReviews`)
        const data = await res.json()
        const reviews = data.reviewData

        setReportedReviews(reviews)
        

        const res2 = await fetch(`/api/getReportedDiscussions`)
        const data2 = await res2.json()
        const discussions = data2.discussionData

        setReportedDiscussions(discussions)
    }

    useEffect(() => {
        if (!profile) return;
        if (profile.admin) {
            setAdmin(true)
        }
        populateReported()
    }, [profile])

    
    return (<div>
        <TopBar />
    
        { admin ? 
            <div className='user-profile'>
                <p>
                    User Reports
                </p>
                {reportedReviews.map((review) => <FeedItem key={review.id} review={review} />)}
                {reportedDiscussions.map((discussion) => <DiscussionBlock key={discussion.id} discussion={discussion} subThreads={false}/>)}
            </div>
        : <div>Not authorized</div>

        }
        
    </div>)

}