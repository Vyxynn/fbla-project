// frontend/src/pages/AdminCommentsSub.jsx

import React, { useState, useEffect } from "react";
import CommentSubmission from "../components/CommentSubmission.jsx";

function AdminCommentsSub() {
  const [comments, setComments] = useState([]);
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommentsAndItems();
  }, []);

  const fetchCommentsAndItems = async () => {
    try {
      setLoading(true);

      // Fetch all pending comments
      const commentsResponse = await fetch(
        "http://localhost:3000/api/commentsSub"
      );
      if (!commentsResponse.ok) throw new Error("Failed to fetch comments");
      const commentsData = await commentsResponse.json();

      // Fetch all items to get item names
      const itemsResponse = await fetch("http://localhost:3000/api/items");
      if (!itemsResponse.ok) throw new Error("Failed to fetch items");
      const itemsData = await itemsResponse.json();

      // Create a map of item IDs to item data
      const itemsMap = {};
      itemsData.forEach((item) => {
        itemsMap[item.id] = item;
      });

      setComments(commentsData);
      setItems(itemsMap);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (comment) => {
    try {
      // Add comment to public comments database
      const response = await fetch("http://localhost:3000/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemId: comment.itemId,
          name: comment.name,
          response: comment.response,
        }),
      });

      if (!response.ok) throw new Error("Failed to approve comment");

      // Delete from admin review comments
      await fetch(`http://localhost:3000/api/commentsSub/${comment.id}`, {
        method: "DELETE",
      });

      fetchCommentsAndItems();
    } catch (err) {
      alert("Error approving comment: " + err.message);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to reject this comment?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/commentsSub/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to reject comment");

      fetchCommentsAndItems();
    } catch (error) {
      alert("Error rejecting comment: " + error.message);
    }
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Comment Submissions</h2>
      <p>Review and approve/reject comment submissions</p>

      {comments.length === 0 ? (
        <p>No comments to review</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <CommentSubmission
              key={comment.id}
              comment={comment}
              itemName={items[comment.itemId]?.itemName}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminCommentsSub;
