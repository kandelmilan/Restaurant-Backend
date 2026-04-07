const db = require("../config/db");

const getAllHeroes = (callback) => {
    db.query("SELECT * FROM heroes ORDER BY id ASC", callback);
};

const createHero = (data, callback) => {
    const sql = `
    INSERT INTO heroes
    (tagline,title,highlight,description,image)
    VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [
        data.tagline,
        data.title,
        data.highlight,
        data.description,
        data.image
    ], callback);
};

const updateHero = (id, data, callback) => {
    const sql = `
    UPDATE heroes SET
    tagline=?, title=?, highlight=?, description=?, image=?
    WHERE id=?
    `;
    db.query(sql, [
        data.tagline,
        data.title,
        data.highlight,
        data.description,
        data.image,
        id
    ], callback);
};

const deleteHero = (id, callback) => {
    db.query("DELETE FROM heroes WHERE id=?", [id], callback);
};

module.exports = {
    getAllHeroes,
    createHero,
    updateHero,
    deleteHero
};