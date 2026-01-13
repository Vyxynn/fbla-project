// backend/src/database/queries.js

import { adminReviewDb, itemsDb, commentsDb } from "./init.js";

// ==================== Admin Submission ====================
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
    const stmt = adminReviewDb.prepare(
        "SELECT * FROM submissions ORDER BY createdAt DESC"
    );
    return stmt.all();
};

export const getSubmissionById = (id) => {
    const stmt = adminReviewDb.prepare(
        "SELECT * FROM submissions WHERE id = ?"
    );
    return stmt.get(id);
};

export const deleteSubmission = (id) => {
    const stmt = adminReviewDb.prepare("DELETE FROM submissions WHERE id = ?");
    return stmt.run(id);
};

// ==================== Item ====================
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
    const stmt = itemsDb.prepare("SELECT * FROM items ORDER BY createdAt DESC");
    return stmt.all();
};

export const getItemById = (id) => {
    const stmt = itemsDb.prepare("SELECT * FROM items WHERE id = ?");
    return stmt.get(id);
};

export const deleteItem = (id) => {
    const stmt = itemsDb.prepare("DELETE FROM items WHERE id = ?");
    return stmt.run(id);
};

// ==================== Admin Comment ====================
export const insertAdminComment = (data) => {
    const stmt = adminReviewDb.prepare(`
    INSERT INTO comments (itemId, name, response)
    VALUES (?, ?, ?)
  `);

    const result = stmt.run(data.itemId, data.name, data.response);

    return result.lastInsertRowid;
};

export const getAdminCommentsByItemId = (itemId) => {
    const stmt = adminReviewDb.prepare(
        "SELECT * FROM comments WHERE itemId = ? ORDER BY createdAt DESC"
    );
    return stmt.all(itemId);
};

export const getAllAdminComments = () => {
    const stmt = adminReviewDb.prepare(
        "SELECT * FROM comments ORDER by createdAt DESC"
    );
    return stmt.all();
};

export const deleteAdminComment = (id) => {
    const stmt = adminReviewDb.prepare(`
    DELETE FROM comments WHERE id = ?
    `);
    return stmt.run(id);
};

// ==================== COMMENTS ====================
export const insertComment = (data) => {
    const stmt = commentsDb.prepare(`
    INSERT INTO comments (itemId, name, response)
    VALUES (?, ?, ?)
  `);

    const result = stmt.run(data.itemId, data.name, data.response);

    return result.lastInsertRowid;
};

export const getCommentsByItemId = (itemId) => {
    const stmt = commentsDb.prepare(
        "SELECT * FROM comments WHERE itemId = ? ORDER BY createdAt DESC"
    );
    return stmt.all(itemId);
};

export const getAllComments = () => {
    const stmt = commentsDb.prepare(
        "SELECT * FROM comments ORDER BY createdAt DESC"
    );
    return stmt.all();
};

export const deleteComment = (id) => {
    const stmt = commentsDb.prepare("DELETE FROM comments WHERE id = ?");
    return stmt.run(id);
};
