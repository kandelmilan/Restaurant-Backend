const db = require("../config/db");

// Get all stories
const getAllStories = (callback) => {
    db.query("SELECT * FROM stories ORDER BY id DESC", callback);
};

// Create story
const createStory = (data, callback) => {
    const sql = `
        INSERT INTO stories (subtitle, title, content, highlight)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [
        data.subtitle,
        data.title,
        data.content,
        data.highlight,
    ], callback);
};

// Update story
const updateStory = (id, data, callback) => {
    const sql = `
        UPDATE stories
        SET subtitle=?, title=?, content=?, highlight=?
        WHERE id=?
    `;
    db.query(sql, [
        data.subtitle,
        data.title,
        data.content,
        data.highlight,
        id,
    ], callback);
};

// Delete story
const deleteStory = (id, callback) => {
    db.query("DELETE FROM stories WHERE id=?", [id], callback);
};

module.exports = {
    getAllStories,
    createStory,
    updateStory,
    deleteStory,
};