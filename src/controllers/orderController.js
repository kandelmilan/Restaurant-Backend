const orderModel = require("../models/orderModel");

// GET all
exports.getOrders = (req, res) => {
    orderModel.getAllOrders((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// CREATE
exports.createOrder = (req, res) => {
    const data = req.body;

    // Auto generate Order ID like ORD-001
    const order_id = `ORD-${Date.now()}`;

    orderModel.createOrder({ ...data, order_id }, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order created successfully" });
    });
};

// UPDATE
exports.updateOrder = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    orderModel.updateOrder(id, data, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order updated successfully" });
    });
};

// DELETE
exports.deleteOrder = (req, res) => {
    const id = req.params.id;

    orderModel.deleteOrder(id, (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Order deleted successfully" });
    });
};