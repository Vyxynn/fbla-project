// frontend/src/pages/AdminComments.jsx

import React from "react";
import { useState, useEffect } from "react";
import ApprovedComment from "../components/ApprovedComment.jsx";

function AdminComments() {
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

        // Fetch all approved comments
        const commentsResponse = await fetch(
          "http://localhost:3000/api/comments"
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

    const handleDelete = async (id) => {
      if (!confirm("Are you sure you want to delete this comment?")) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/comments/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Failed to delete comment");

        // Refresh the list
        fetchCommentsAndItems();
      } catch (error) {
        alert("Error deleting comment: " + error.message);
      }
    };

    if (loading) return <div>Loading comments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <section>
        <h2>Approved Comments</h2>
        <p>View and manage all approved comments</p>

        {comments.length === 0 ? (
          <p>No approved comments yet</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <ApprovedComment
                key={comment.id}
                comment={comment}
                itemName={items[comment.itemId]?.itemName}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>
    );
}

export default AdminComments;