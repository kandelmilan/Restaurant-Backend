const express = require("express");
const router = express.Router();

// Import all routes
const heroRoutes = require("./heroRoutes");
const adminRoute = require("./adminRoutes");

// Use routes
router.use("/heroes", heroRoutes);
router.use("/admin", adminRoute)

module.exports = router;