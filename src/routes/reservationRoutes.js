const express = require("express");
const router = express.Router();
const { sendReservation } = require("../controllers/reservationController");

router.post("/", sendReservation);

module.exports = router;