const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// GET all orders
router.get("/", orderController.getOrders);

// CREATE order
router.post("/", orderController.createOrder);

// UPDATE order
router.put("/:id", orderController.updateOrder);

// DELETE order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;