// frontend/src/components/Item.jsx

import { useState, useEffect } from "react";

function Item({ item, onReplyClick }) {
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const response = await fetch(
                `http://localhost:3000/api/comments/${item.id}`
            );
            if (!response.ok) throw new Error("Failed to fetch comments");
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        } finally {
            setLoadingComments(false);
        }
    };

    const handleReplyClick = () => {
        onReplyClick(item.id);
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    return (
        <div style={{ marginBottom: "2rem" }}>
            <h3>{item.itemName}</h3>

            <div>
                <strong>Location:</strong> {item.itemLocation}
                {item.itemLocationExtraInfo &&
                    ` - ${item.itemLocationExtraInfo}`}
            </div>

            {item.itemExtraInfo && (
                <div>
                    <strong>Details:</strong> {item.itemExtraInfo}
                </div>
            )}

            {item.itemImagePath && (
                <div>
                    <img
                        src={`http://localhost:3000${item.itemImagePath}`}
                        alt={item.itemName}
                        width="200"
                    />
                </div>
            )}

            <div>
                <strong>Submitted by:</strong> {item.userName || "Anonymous"}
            </div>

            {item.contactEmail && (
                <div>
                    <strong>Email:</strong> {item.contactEmail}
                </div>
            )}

            {item.contactPhone && (
                <div>
                    <strong>Phone:</strong> {item.contactPhone}
                </div>
            )}

            <div>
                <strong>Submitted:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
            </div>

            <div>
                <button
                    className="item-comment-button"
                    onClick={handleReplyClick}
                >
                    Reply
                </button>
                {comments.length > 0 && (
                    <button
                        className="item-comment-button"
                        onClick={toggleComments}
                    >
                        {showComments ? "Hide" : "Show"} Comments (
                        {comments.length})
                    </button>
                )}
            </div>

            {/* Comments Section */}
            {showComments && comments.length > 0 && (
                <div>
                    <h4>Comments ({comments.length})</h4>
                    {loadingComments ? (
                        <p>Loading comments...</p>
                    ) : (
                        <div>
                            {comments.map((comment) => (
                                <div key={comment.id}>
                                    <div>{comment.name}</div>
                                    <div>{comment.response}</div>
                                    <div>
                                        {new Date(
                                            comment.createdAt
                                        ).toLocaleString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <hr />
        </div>
    );
}

export default Item;
