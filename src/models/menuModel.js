const db = require("../config/db");

const getAllMenuItems = (callback) => {
    db.query("SELECT * FROM menu_items ORDER BY id ASC", callback);
};

const getMenuItemById = (id, callback) => {
    db.query("SELECT * FROM menu_items WHERE id = ?", [id], callback);
};

const createMenuItem = (data, callback) => {
    const sql = `
        INSERT INTO menu_items (name, price, image, category, is_veg, spice_level, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.name || "",
        data.price || "",
        data.image || "",
        data.category || "curry",
        data.is_veg ?? 1,
        data.spice_level || 1,
        data.description || ""
    ], callback);
};

const updateMenuItem = (id, data, callback) => {
    const sql = `
        UPDATE menu_items SET
        name=?, price=?, image=?, category=?, is_veg=?, spice_level=?, description=?
        WHERE id=?
    `;
    db.query(sql, [
        data.name || "",
        data.price || "",
        data.image || "",
        data.category || "curry",
        data.is_veg ?? 1,
        data.spice_level || 1,
        data.description || "",
        id
    ], callback);
};

const deleteMenuItem = (id, callback) => {
    db.query("DELETE FROM menu_items WHERE id = ?", [id], callback);
};

module.exports = {
    getAllMenuItems,
    getMenuItemById,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem
};