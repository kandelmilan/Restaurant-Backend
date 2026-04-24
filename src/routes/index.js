const express = require("express");
const router = express.Router();

// Import all routes
const heroRoutes = require("./heroRoutes");
const adminRoute = require("./adminRoutes");
const storyRoutes = require("./storyRoutes");
const menuRoutes = require("./menuRoutes");
const testimonialRoutes = require("./testimonialsRoutes");
const { sendReservation } = require("../controllers/reservationController");


// Use routes
router.use("/heroes", heroRoutes);
router.use("/admin", adminRoute);
router.use("/story", storyRoutes);
router.use("/menu", menuRoutes);
router.use("/testimonial", testimonialRoutes);
router.use("/reservation", sendReservation);

module.exports = router;    