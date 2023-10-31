import React, {useState} from 'react';
import TopBar from '@components/TopBar';

const HomePage = () => {
    const [user, setUser] = useState({
        username: 'test', // Replace with the actual username (backend integration)
    });

    //hardcoded conversations for now
    const [userConversations, setUserConversations] = useState([
        {
            id: 1,
            username: 'User1',
            movie: 'Movie A',
            rating: 4,
            comments: [
            { id: 1, username: 'User1', text: 'Great movie!' },
            { id: 2, username: 'User2', text: 'I enjoyed it.' },
            ],
        },
        {
            id: 2,
            username: 'User2',
            movie: 'Movie B',
            rating: 5,
            comments: [
            { id: 3, username: 'User2', text: 'The best movie ever!' },
            ],
        },
    ]);

    const [selectedConversation, setSelectedConversation] = useState(null);
    const [newComment, setNewComment] = useState('');

    const handleAddCommentClick = (conversationId) => {
        setSelectedConversation(conversationId);
    };

    const handleBackToHomePage = () => {
        setSelectedConversation(null);
        setNewComment('');
    };

    const handleCommentSubmit = () => {
        if (newComment.trim() !== '') {
        // Find the conversation by conversationId
        const updatedConversations = userConversations.map((conversation) => {
            if (conversation.id === selectedConversation) {
            conversation.comments.push({
                id: conversation.comments.length + 1,
                username: user.username, // Replace with the actual username
                text: newComment,
            });
            }
            return conversation;
        });

        setUserConversations(updatedConversations);
        setNewComment('');
        }
    };

    return (
        <>
            <TopBar/>
            <div className="conversations-container">
                <h2>Your Feed</h2>
                {selectedConversation ? (
                    <div className="conversation">
                        <ul>
                            {userConversations
                            .find((conversation) => conversation.id === selectedConversation)
                            .comments.map((comment) => (
                                <li key={comment.id}>
                                <strong>{comment.username}:</strong> {comment.text}
                                </li>
                            ))}
                        </ul>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add your comment here"
                            rows="4"
                        />
                        <button onClick={handleCommentSubmit}>Add Comment</button>
                        <button onClick={handleBackToHomePage}>Back to Home</button>
                    </div>
                ) : (
                    userConversations.map((conversation) => (
                    <div key={conversation.id} className="conversation">
                        <div className="conversation-header">
                            <p>Username: {conversation.username}</p>
                            <p>Movie: {conversation.movie}</p>
                            <p>Rating: {conversation.rating}</p>
                        </div>
                        <ul>
                        {conversation.comments.map((comment) => (
                            <li key={comment.id}>
                            <strong>{comment.username}:</strong> {comment.text}
                            </li>
                        ))}
                        </ul>
                        <button onClick={() => handleAddCommentClick(conversation.id)}>
                        Add Comment
                        </button>
                    </div>
                    ))
                )}
            </div>
        </>
    );
};
  
export default HomePage;