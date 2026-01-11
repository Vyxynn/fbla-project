// frontend/src/pages/AdminSubmissions.jsx

import React from "react";
import { useState, useEffect } from "react";
import ItemSubmission from "../components/ItemSubmission.jsx";

function AdminSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/submissions");
      if (!response.ok) throw new Error("Failed to fetch submissions");
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submission) => {
    try {
      // Move submission to items
      const response = await fetch("http://localhost:3000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (!response.ok) throw new Error("Failed to approve submission");

      // Delete from submissions
      await fetch(`http://localhost:3000/api/submissions/${submission.id}?keepImage=true`, {
        method: "DELETE",
      });

      // Refresh list
      fetchSubmissions();
    } catch (err) {
      alert("Error approving submission: " + err.message);
    }
  };

  const handleReject = async (id) => {
    if (!confirm("Are you sure you want to reject this submission?")) return;

    try {
      const response = await fetch(
        `http://localhost:3000/api/submissions/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to reject submission");
      fetchSubmissions();
    } catch (error) {
      alert("Error rejecting submission: " + error.message);
    }
  };

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Admin Submissions</h2>
      <p>Review and approve/reject item submissions</p>

      {submissions.length === 0 ? (
        <p>No submissions to review</p>
      ) : (
        <div>
          {submissions.map((submission) => (
            <ItemSubmission
              key={submission.id}
              submission={submission}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminSubmissions;
