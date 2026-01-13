// backend/src/routes/api.js

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import {
    insertSubmission,
    getAllSubmissions,
    getSubmissionById,
    deleteSubmission,
    insertItem,
    getAllItems,
    getItemById,
    deleteItem,
    insertComment,
    getCommentsByItemId,
    getAllComments,
    deleteComment,
    insertAdminComment,
    getAdminCommentsByItemId,
    getAllAdminComments,
    deleteAdminComment,
} from "../database/queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, "../../uploads");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Invalid file type. Only JPEG, JPG, PNG, and WebP are allowed."
                )
            );
        }
    },
});

// ==================== Submission Routes ====================
// Submit a new item for review
router.post("/submit", upload.single("itemImage"), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Image file is required" });
        }

        const submissionData = {
            itemName: req.body.itemName,
            itemExtraInfo: req.body.itemExtraInfo,
            itemLocation: req.body.itemLocation,
            itemLocationExtraInfo: req.body.itemLocationExtraInfo,
            itemImagePath: `/uploads/${req.file.filename}`,
            userName: req.body.userName,
            contactEmail: req.body.userEmail,
            contactPhone: req.body.userPhone,
        };

        const id = insertSubmission(submissionData);

        res.status(201).json({
            message: "Submission created successfully",
            id: id,
        });
    } catch (error) {
        console.error("Error creating submission:", error);
        res.status(500).json({ error: "Failed to create submission" });
    }
});

// Get all submissions
router.get("/submissions", (req, res) => {
    try {
        const submissions = getAllSubmissions();
        res.json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
});

// Get a specific submission
router.get("/submissions/:id", (req, res) => {
    try {
        const submission = getSubmissionById(req.params.id);
        if (!submission) {
            return res.status(404).json({ error: "Submission not found" });
        }
        res.json(submission);
    } catch (error) {
        console.error("Error fetching submission:", error);
        res.status(500).json({ error: "Failed to fetch submission" });
    }
});

// Delete a submission
router.delete("/submissions/:id", (req, res) => {
    try {
        const submission = getSubmissionById(req.params.id);

        if (!submission) {
            return res.status(404).json({ error: "Submission not found" });
        }

        deleteSubmission(req.params.id);

        // Delete the image file if it exists and if keepImage is false
        if (req.query.keepImage !== "true" && submission.itemImagePath) {
            const imagePath = path.join(
                __dirname,
                "../..",
                submission.itemImagePath
            );

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted image: ${imagePath}`);
            }
        }

        res.json({ message: "Submission deleted successfully" });
    } catch (error) {
        console.error("Error deleting submission:", error);
        res.status(500).json({ error: "Failed to delete submission" });
    }
});

// ==================== Item Routes ====================
// Approve submission/add item
router.post("/items", (req, res) => {
    try {
        const itemData = {
            itemName: req.body.itemName,
            itemExtraInfo: req.body.itemExtraInfo,
            itemLocation: req.body.itemLocation,
            itemLocationExtraInfo: req.body.itemLocationExtraInfo,
            itemImagePath: req.body.itemImagePath,
            userName: req.body.userName,
            contactEmail: req.body.contactEmail,
            contactPhone: req.body.contactPhone,
        };

        const id = insertItem(itemData);

        res.status(201).json({
            message: "Item approved successfully",
            id: id,
        });
    } catch (error) {
        console.error("Error approving item:", error);
        res.status(500).json({ error: "Failed to approve item" });
    }
});

// Get all items
router.get("/items", (req, res) => {
    try {
        const items = getAllItems();
        res.json(items);
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).json({ error: "Failed to fetch items" });
    }
});

// Get a specific item
router.get("/items/:id", (req, res) => {
    try {
        const item = getItemById(req.params.id);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }
        res.json(item);
    } catch (error) {
        console.error("Error fetching item:", error);
        res.status(500).json({ error: "Failed to fetch item" });
    }
});

// Delete an item
router.delete("/items/:id", (req, res) => {
    try {
        const item = getItemById(req.params.id);

        if (!item) return res.status(404).json({ error: "Item not found" });

        // Delete from database
        deleteItem(req.params.id);

        // Delete the image file if it exists
        if (item.itemImagePath) {
            const imagePath = path.join(__dirname, "../..", item.itemImagePath);

            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                console.log(`Deleted image: ${imagePath}`);
            } else {
                console.log(`Image not found: ${imagePath}`);
            }
        }

        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Failed to delete item" });
    }
});

// ==================== Comment Routes ====================
// Submit a comment for an item
router.post("/comments", (req, res) => {
    try {
        const { itemId, name, response } = req.body;

        if (!itemId || !name || !response) {
            return res.status(400).json({
                error: "itemId, name, and response are required",
            });
        }

        // Verify the item exists
        const item = getItemById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        const commentData = {
            itemId,
            name: name.trim(),
            response: response.trim(),
        };

        const id = insertComment(commentData);

        res.status(201).json({
            message: "Comment added successfully",
            id: id,
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});

// Get comments for a specific item
router.get("/comments/:itemId", (req, res) => {
    try {
        const comments = getCommentsByItemId(req.params.itemId);
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// Get all comments
router.get("/comments", (req, res) => {
    try {
        const comments = getAllComments();
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// Delete a comment
router.delete("/comments/:id", (req, res) => {
    try {
        deleteComment(req.params.id);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

// ==================== Comment Submission Routes ====================
// Submit comment to review
router.post("/commentsSub", (req, res) => {
    try {
        const { itemId, name, response } = req.body;

        if (!itemId || !name || !response) {
            return res.status(400).json({
                error: "itemId, name, and response are required",
            });
        }

        // Verify the item exists
        const item = getItemById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item not found" });
        }

        const commentData = {
            itemId,
            name: name.trim(),
            response: response.trim(),
        };

        const id = insertAdminComment(commentData);

        res.status(201).json({
            message: "Comment added successfully",
            id: id,
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
});

// Get admin comments for a specific item
router.get("/commentsSub/:itemId", (req, res) => {
    try {
        const comments = getAdminCommentsByItemId(req.params.itemId);
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// Get all admin comments
router.get("/commentsSub", (req, res) => {
    try {
        const comments = getAllAdminComments();
        res.json(comments);
    } catch (error) {
        console.error("Error fetching comments:", error);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

// Delete an admin comment
router.delete("/commentsSub/:id", (req, res) => {
    try {
        deleteAdminComment(req.params.id);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

export default router;
