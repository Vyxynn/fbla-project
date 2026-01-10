// backend/src/routes/api.js

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import {
  insertSubmission,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission,
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
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
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

// Get all submissions (for admin review)
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
    deleteSubmission(req.params.id);
    res.json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ error: "Failed to delete submission" });
  }
});

export default router;
