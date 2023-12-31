{selectedConversation ? (
    // Render selected conversation
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
    // Render all conversations
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
    )
}




<div className="user-conversations">
                            <h2>User Rating: 4.5/5</h2>
                            <div className="user-conversation">
                                <h3>User 1</h3>
                                <p>Rated: Movie Name</p>
                                <p>Rating: 4.5/5</p>
                                <p>Comments: insert here...</p>
                        </div>
                            <div className="user-conversation">
                                <h3>User 2</h3>
                                <p>Rated: Movie Name</p>
                                <p>Rating: 4.0/5</p>
                                <p>Comments: insert here...</p>
                            </div>
                        </div>