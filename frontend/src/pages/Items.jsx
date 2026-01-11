// frontend/src/pages/Items.jsx

import React from "react";
import { useState, useEffect } from "react";
import Item from "../components/Item.jsx";

function Items() {
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

  if (loading) return <div>Loading items...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>Items</h2>

      {items.length === 0 ? (
        <p>No items to view</p>
      ) : (
        <div>
          {items.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Items;
