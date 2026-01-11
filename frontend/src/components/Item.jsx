// frontend/src/components.Item.jsx

function Item({ item }) {
  console.log(item.itemImagePath);
  return (
    <div>
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

      <hr />
    </div>
  );
}

export default Item;
