import express from "express";
import { loginAdmin, createAdmin } from "../controllers/adminController.js";

const router = express.Router();

// Login route
router.post("/login", loginAdmin);

// Create first admin (one-time)
router.post("/create", createAdmin);

export default router;