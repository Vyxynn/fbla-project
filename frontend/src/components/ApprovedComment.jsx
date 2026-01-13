// frontend/src/components/ApprovedComment.jsx

import React from "react";

function ApprovedComment({ comment, itemName, onDelete }) {
  return (
    <div>
      <div>
        <strong>Item:</strong> {itemName || "Unknown Item"}
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
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>

      <hr />
    </div>
  );
}

export default ApprovedComment;
