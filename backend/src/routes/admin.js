// backend/src/routes/admin.js

import express from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const router = express.Router();

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;

    if (password === process.env.ADMIN_PASS) {
      const token = jwt.sign({ admin: true }, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });

      res.json({
        success: true,
        token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
