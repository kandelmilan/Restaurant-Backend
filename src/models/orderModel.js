const db = require("../config/db"); // your DB connection

// GET all orders
exports.getAllOrders = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM orders ORDER BY created_at DESC";
        db.query(sql, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

// CREATE order
exports.createOrder = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO orders (order_id, customer, items, total, status)
            VALUES (?, ?, ?, ?, ?)
        `;

        const values = [
            data.order_id,
            data.customer,
            data.items,
            data.total,
            data.status || "Pending"
        ];

        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

// UPDATE order
exports.updateOrder = (id, data) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE orders 
            SET customer = ?, items = ?, total = ?, status = ?
            WHERE order_id = ?
        `;

        const values = [
            data.customer,
            data.items,
            data.total,
            data.status,
            id
        ];

        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};

// DELETE order
exports.deleteOrder = (id) => {
    return new Promise((resolve, reject) => {
        const sql = "DELETE FROM orders WHERE order_id = ?";

        db.query(sql, [id], (err, result) => {
            if (err) return reject(err);
            resolve(result.affectedRows > 0);
        });
    });
};