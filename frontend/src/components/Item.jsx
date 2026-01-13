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
      // Changed from commentsSub to comments to show approved comments
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
        {item.itemLocationExtraInfo && ` - ${item.itemLocationExtraInfo}`}
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
        <strong>Submitted:</strong> {new Date(item.createdAt).toLocaleString()}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button className="item-comment-button" onClick={handleReplyClick}>
          Reply
        </button>
        {comments.length > 0 && (
          <button
            className="item-comment-button"
            onClick={toggleComments}
            style={{ backgroundColor: "var(--button-secondary-bg)" }}
          >
            {showComments ? "Hide" : "Show"} Comments ({comments.length})
          </button>
        )}
      </div>

      {/* Comments Section */}
      {showComments && comments.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "var(--form-section-bg)",
            border: "1px solid var(--form-border)",
            borderRadius: "6px",
          }}
        >
          <h4 style={{ marginBottom: "1rem", color: "var(--form-label)" }}>
            Comments ({comments.length})
          </h4>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : (
            <div>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  style={{
                    padding: "0.75rem",
                    marginBottom: "0.75rem",
                    backgroundColor: "var(--input-bg)",
                    border: "1px solid var(--input-border)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "600",
                      color: "var(--form-label)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {comment.name}
                  </div>
                  <div style={{ color: "var(--form-text)" }}>
                    {comment.response}
                  </div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--form-placeholder)",
                      marginTop: "0.5rem",
                    }}
                  >
                    {new Date(comment.createdAt).toLocaleString()}
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
