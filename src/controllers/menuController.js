const menuModel = require("../models/menuModel");

// GET
const getMenu = (req, res) => {
    console.log("API Hit: GET /menu");

    menuModel.getAllMenu((err, results) => {
        if (err) {
            console.error("GET Error:", err);
            return res.status(500).json(err);
        }

        console.log("Menu items:", results.length);
        res.json(results);
    });
};

// POST
const createMenu = (req, res) => {
    console.log("API Hit: POST /menu");
    console.log("Data:", req.body);

    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({
            error: "Name, Price and Image are required",
        });
    }

    menuModel.createMenuItem(req.body, (err, result) => {
        if (err) {
            console.error("POST Error:", err);
            return res.status(500).json(err);
        }

        console.log("Menu item created:", result.insertId);

        res.json({
            message: "Menu item created",
            id: result.insertId,
        });
    });
};

// PUT
const updateMenu = (req, res) => {
    const { id } = req.params;

    console.log(`API Hit: PUT /menu/${id}`);
    console.log("Update Data:", req.body);

    menuModel.updateMenuItem(id, req.body, (err, result) => {
        if (err) {
            console.error("Update Error:", err);
            return res.status(500).json({
                error: "Failed to update menu item",
                details: err.message,
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Menu item not found",
            });
        }

        console.log("Menu updated:", id);

        res.json({
            message: "Menu item updated successfully",
        });
    });
};

// DELETE
const deleteMenu = (req, res) => {
    const { id } = req.params;

    console.log(`API Hit: DELETE /menu/${id}`);

    menuModel.deleteMenuItem(id, (err, result) => {
        if (err) {
            console.error("Delete Error:", err);
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Menu item not found",
            });
        }

        console.log("Menu deleted:", id);

        res.json({
            message: "Menu item deleted successfully",
        });
    });
};

module.exports = {
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
};