// frontend/src/components/CommentSubmission.jsx

import React from "react";

function CommentSubmission({ comment, itemName, onApprove, onReject }) {
  return (
    <div>
      <div>
        <strong>Item:</strong> <span>{itemName || "Unknown Item"}</span>
      </div>

      <div>
        <strong>Commenter:</strong> {comment.name}
      </div>

      <div>
        <strong>Comment:</strong>
        <p>{comment.response}</p>
      </div>

      <div>
        <strong>Submitted:</strong>{" "}
        {new Date(comment.createdAt).toLocaleString()}
      </div>

      <div>
        <button onClick={() => onApprove(comment)}>Approve</button>
        <button onClick={() => onReject(comment.id)}>Reject</button>
      </div>

      <hr />
    </div>
  );
}

export default CommentSubmission;
