// frontend/src/pages/Items.jsx

import React, { useState, useEffect } from "react";
import Item from "../components/Item.jsx";

function Items() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [commentName, setCommentName] = useState("");
  const [commentResponse, setCommentResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // For triggering re-renders

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/items");

      if (!response.ok) throw new Error("Failed to fetch items");

      const data = await response.json();
      setItems(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyClick = (itemId) => {
    setSelectedItemId(itemId);
    setShowCommentForm(true);
    setCommentName("");
    setCommentResponse("");
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!commentName.trim() || !commentResponse.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    if (!selectedItemId) {
      alert("Please select an item to reply to");
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch("http://localhost:3000/api/commentsSub", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              itemId: selectedItemId,
              name: commentName,
              response: commentResponse,
          }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      alert("Comment submitted successfully!");

      // Reset form
      setCommentName("");
      setCommentResponse("");
      setShowCommentForm(false);
      setSelectedItemId(null);

      // Trigger refresh of comments by updating key
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Error submitting comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelComment = () => {
    setShowCommentForm(false);
    setSelectedItemId(null);
    setCommentName("");
    setCommentResponse("");
  };

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Items</h2>

      {showCommentForm && (
        <form id="comment-form" onSubmit={handleSubmitComment}>
          <h3>Reply to Item</h3>
          <p style={{ marginBottom: "1rem", color: "var(--form-text)" }}>
            Replying to:{" "}
            <strong>
              {items.find((item) => item.id === selectedItemId)?.itemName}
            </strong>
          </p>

          <div className="comment-form-question">
            <label htmlFor="comment-form-name">
              What is your name? <span className="form-required">*</span>
            </label>
            <input
              type="text"
              name="comment-form-name"
              id="comment-form-name"
              placeholder="John Doe"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
            />
          </div>

          <div className="comment-form-question">
            <label htmlFor="comment-form-response">
              What would you like to say?{" "}
              <span className="form-required">*</span>
            </label>
            <textarea
              id="comment-form-response"
              name="comment-form-response"
              value={commentResponse}
              onChange={(e) => setCommentResponse(e.target.value)}
              required
            />
          </div>

          <div
            className="comment-form-question"
            style={{ display: "flex", gap: "1rem" }}
          >
            <button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Reply"}
            </button>
            <button
              type="button"
              onClick={handleCancelComment}
              style={{ backgroundColor: "var(--button-secondary-bg)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {items.length === 0 ? (
        <p>No items to view</p>
      ) : (
        <div>
          {items.map((item) => (
            <Item
              key={`${item.id}-${refreshKey}`}
              item={item}
              onReplyClick={handleReplyClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Items;
