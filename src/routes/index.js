const express = require("express");
const router = express.Router();

// Import all routes
const heroRoutes = require("./heroRoutes");

// Use routes
router.use("/heroes", heroRoutes);

module.exports = router;