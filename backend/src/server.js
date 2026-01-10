// backend/src/server.js

import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import "dotenv/config";
import {
    insertSubmission,
    getAllSubmissions,
    getSubmissionById,
    deleteSubmission,
} from "./database/queries.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
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

// Middleware
app.use(
    cors({
        origin:
            NODE_ENV === "production"
                ? process.env.CLIENT_URL
                : "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ==========================================
// ROUTES
// ==========================================

// Health check
app.get("/", (req, res) => {
    res.json({
        message: "FBLA Project API",
        version: "1.0.0",
        status: "running",
    });
});

// Submit a new item for review
app.post("/api/submit", upload.single("itemImage"), (req, res) => {
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

app.post("/admin/login", (req, res) => {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASS) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Invalid password" });
    }
});

// Get all submissions (for admin review)
app.get("/api/submissions", (req, res) => {
    try {
        const submissions = getAllSubmissions();
        res.json(submissions);
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
});

// Get a specific submission
app.get("/api/submissions/:id", (req, res) => {
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
app.delete("/api/submissions/:id", (req, res) => {
    try {
        deleteSubmission(req.params.id);
        res.json({ message: "Submission deleted successfully" });
    } catch (error) {
        console.error("Error deleting submission:", error);
        res.status(500).json({ error: "Failed to delete submission" });
    }
});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 CORS enabled for http://localhost:5173`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
});
