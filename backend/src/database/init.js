// backend/src/database/init.js

import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_DIR = path.join(__dirname, "../../database");

// Check if directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Create adminReview DB
const adminReviewDb = new Database(path.join(DB_DIR, "adminReview.db"));

adminReviewDb.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemName TEXT NOT NULL,
    itemExtraInfo TEXT,
    itemLocation TEXT NOT NULL,
    itemLocationExtraInfo TEXT,
    itemImagePath TEXT NOT NULL,
    userName TEXT,
    contactEmail TEXT,
    contactPhone TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create items DB
const itemsDb = new Database(path.join(DB_DIR, "items.db"));

itemsDb.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemName TEXT NOT NULL,
    itemExtraInfo TEXT,
    itemLocation TEXT NOT NULL,
    itemLocationExtraInfo TEXT,
    itemImagePath TEXT NOT NULL,
    userName TEXT,
    contactEmail TEXT,
    contactPhone TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create comments DB
const commentsDb = new Database(path.join(DB_DIR, "comments.db"));

commentsDb.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    itemId INTEGER NOT NULL,
    name TEXT NOT NULL,
    response TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

console.log("Databases created successfully");

export { adminReviewDb, itemsDb, commentsDb };
