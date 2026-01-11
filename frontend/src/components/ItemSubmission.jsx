// frontend/src/components/ItemSubmission.jsx

import React from "react";

function ItemSubmission({ submission, onApprove, onReject }) {
    console.log(submission.itemImagePath);
  return (
    <div>
      <h3>{submission.itemName}</h3>

      <div>
        <strong>Location:</strong> {submission.itemLocation}
        {submission.itemLocationExtraInfo &&
          ` - ${submission.itemLocationExtraInfo}`}
      </div>

      {submission.itemExtraInfo && (
        <div>
          <strong>Details:</strong> {submission.itemExtraInfo}
        </div>
      )}

      {submission.itemImagePath && (
        <div>
          <img
            src={`http://localhost:3000${submission.itemImagePath}`}
            alt={submission.itemName}
            width="200"
          />
        </div>
      )}

      <div>
        <strong>Submitted by:</strong> {submission.userName || "Anonymous"}
      </div>

      {submission.contactEmail && (
        <div>
          <strong>Email:</strong> {submission.contactEmail}
        </div>
      )}

      {submission.contactPhone && (
        <div>
          <strong>Phone:</strong> {submission.contactPhone}
        </div>
      )}

      <div>
        <strong>Submitted:</strong>{" "}
        {new Date(submission.createdAt).toLocaleString()}
      </div>

      <div>
        <button onClick={() => onApprove(submission)}>Approve</button>
        <button onClick={() => onReject(submission.id)}>Reject</button>
      </div>

      <hr />
    </div>
  );
}

export default ItemSubmission;
