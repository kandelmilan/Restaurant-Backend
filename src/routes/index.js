const express = require("express");
const router = express.Router();

// Import all routes
const heroRoutes = require("./heroRoutes");
const adminRoute = require("./adminRoutes");
const storyRoutes = require("./storyRoutes");

// Use routes
router.use("/heroes", heroRoutes);
router.use("/admin", adminRoute);
router.use("/story", storyRoutes);

module.exports = router;