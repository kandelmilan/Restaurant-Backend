const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware")

// POST /admin/login
router.post("/login", adminController.login);
// Example protected route
router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard", admin: req.admin });
});


module.exports = router;