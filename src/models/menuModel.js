const db = require("../config/db");

// GET
const getAllMenu = (callback) => {
    db.query("SELECT * FROM menu_items ORDER BY id DESC", callback);
};

// CREATE
const createMenuItem = (data, callback) => {
    const sql = `
        INSERT INTO menu_items 
        (name, price, image, category, isVeg, spiceLevel, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        data.name,
        data.price,
        data.image,
        data.category,
        data.isVeg,
        data.spiceLevel,
        data.description,
    ], callback);
};

// UPDATE
const updateMenuItem = (id, data, callback) => {
    const sql = `
        UPDATE menu_items
        SET name=?, price=?, image=?, category=?, isVeg=?, spiceLevel=?, description=?
        WHERE id=?
    `;

    db.query(sql, [
        data.name || "",
        data.price || "",
        data.image || "",
        data.category || "",
        data.isVeg ?? true,
        data.spiceLevel || 1,
        data.description || "",
        id,
    ], callback);
};

// DELETE
const deleteMenuItem = (id, callback) => {
    db.query("DELETE FROM menu_items WHERE id=?", [id], callback);
};

module.exports = {
    getAllMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
};