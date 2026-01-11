// frontend/src/pages/AdminItems.jsx

import React from "react";
import { useState, useEffect } from "react";
import AdminItem from "../components/AdminItem.jsx";

function AdminItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/items/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");
      fetchItems();
    } catch (error) {
      alert("Error deleting : " + error.message);
    }
  };

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Admin Items</h2>
      <p>Review and delete items</p>

      {items.length === 0 ? (
        <p>No items to view</p>
      ) : (
        <div>
          {items.map((item) => (
            <AdminItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AdminItems;
