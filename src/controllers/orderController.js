const orderModel = require("../models/orderModel");

// Helper: Generate Order ID
const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};

// GET all orders
exports.getOrders = async (req, res) => {
    try {
        const results = await orderModel.getAllOrders();
        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: err.message
        });
    }
};

// CREATE order
exports.createOrder = async (req, res) => {
    try {
        const data = req.body;

        // Basic validation
        if (!data.customer || !data.items || !data.total) {
            return res.status(400).json({
                success: false,
                message: "Customer, items, and total are required"
            });
        }

        const order_id = generateOrderId();

        await orderModel.createOrder({ ...data, order_id });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order_id
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create order",
            error: err.message
        });
    }
};

// UPDATE order
exports.updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const updated = await orderModel.updateOrder(id, data);

        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order updated successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update order",
            error: err.message
        });
    }
};

// DELETE order
exports.deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await orderModel.deleteOrder(id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete order",
            error: err.message
        });
    }
};