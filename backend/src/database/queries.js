// backend/src/database/queries.js

import { adminReviewDb, itemsDb } from "./init.js";

// Admin Review
export const insertSubmission = (data) => {
  const stmt = adminReviewDb.prepare(`
    INSERT INTO submissions (
      itemName, itemExtraInfo, itemLocation, itemLocationExtraInfo,
      itemImagePath, userName, contactEmail, contactPhone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const result = stmt.run(
        data.itemName,
        data.itemExtraInfo || null,
        data.itemLocation,
        data.itemLocationExtraInfo || null,
        data.itemImagePath,
        data.userName || null,
        data.contactEmail || null,
        data.contactPhone || null
    );

    return result.lastInsertRowid;
};

export const getAllSubmissions = () => {
    const stmt = adminReviewDb.prepare('SELECT * FROM submissions ODER BY createdAt DESC');
    return stmt.all();
};

export const getSubmissionById = () => {
    const stmt = adminReviewDb.prepare('SELECT * FROM submissions WHERE id = ?');
    return stmt.get(id);
};

export const deleteSubmission = (id) => {
    const stmt = adminReviewDb.prepare('DELETE FROM submissions WHERE ID = ?');
    return stmt.run(id);
};

// Item
export const insertItem = (data) => {
    const stmt = itemsDb.prepare(`
    INSERT INTO items (
      itemName, itemExtraInfo, itemLocation, itemLocationExtraInfo,
      itemImagePath, userName, contactEmail, contactPhone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

    const result = stmt.run(
        data.itemName,
        data.itemExtraInfo || null,
        data.itemLocation,
        data.itemLocationExtraInfo || null,
        data.itemImagePath,
        data.userName || null,
        data.contactEmail || null,
        data.contactPhone || null
    );

    return result.lastInsertRowid;
};

export const getAllItems = () => {
    const stmt = itemsDb.prepare('SELECT * FROM items ORDER BY createdAt DESC');
    return stmt.all();
};

export const getItemById = (id) => {
    const stmt = itemsDb.prepare('SELECT * FROM items WHERE id = ?');
    return stmt.get(id);
};

export const deleteItem = (id) => {
    const stmt = itemsDb.prepare('DELETE FROM items WHERE id = ?');
    return stmt.get(id);
}