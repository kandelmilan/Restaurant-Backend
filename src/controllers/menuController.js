const menuModel = require("../models/menuModel");

const getMenuItems = (req, res) => {
    menuModel.getAllMenuItems((err, results) => {
        if (err) {
            console.error("Error fetching menu items:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("API Hit: GET /menu-items");
        res.json(results);
    });
};

const getMenuItem = (req, res) => {
    const { id } = req.params;
    menuModel.getMenuItemById(id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: "Item not found" });
        res.json(results[0]);
    });
};

const createMenuItem = (req, res) => {
    try {
        const imageUrl = req.file ? req.file.path : "";

        const menuData = {
            name: req.body.name || "",
            price: req.body.price || "",
            image: imageUrl,
            category: req.body.category || "curry",
            is_veg: req.body.is_veg === "true" || req.body.is_veg === "1" ? 1 : 0,
            spice_level: parseInt(req.body.spice_level) || 1,
            description: req.body.description || ""
        };

        console.log("Creating menu item:", menuData);

        menuModel.createMenuItem(menuData, (err, result) => {
            if (err) {
                console.error("DB ERROR:", err);
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({
                message: "Menu item created",
                item: { id: result.insertId, ...menuData }
            });
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

const updateMenuItem = (req, res) => {
    const { id } = req.params;

    try {
        let imageUrl;
        if (req.file) {
            imageUrl = req.file.path;
        } else if (req.body.existingImage) {
            imageUrl = req.body.existingImage;
        } else {
            imageUrl = "";
        }

        const menuData = {
            name: req.body.name || "",
            price: req.body.price || "",
            image: imageUrl,
            category: req.body.category || "curry",
            is_veg: req.body.is_veg === "true" || req.body.is_veg === "1" ? 1 : 0,
            spice_level: parseInt(req.body.spice_level) || 1,
            description: req.body.description || ""
        };

        console.log(`Updating menu item ${id}:`, menuData);

        menuModel.updateMenuItem(id, menuData, (err) => {
            if (err) {
                console.error("DB ERROR:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Menu item updated", item: { id, ...menuData } });
        });

    } catch (err) {
        console.error("SERVER ERROR:", err);
        res.status(500).json({ error: err.message });
    }
};

const deleteMenuItem = (req, res) => {
    const { id } = req.params;

    menuModel.deleteMenuItem(id, (err) => {
        if (err) {
            console.error("DB ERROR:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log(`API Hit: DELETE /menu-items/${id}`);
        res.json({ message: "Menu item deleted" });
    });
};

module.exports = {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};