const db = require("../config/db");

const getByLanguage = (table, translationTable, itemId, language = "en", callback) => {
    const sql = `
        SELECT 
            t.*,
            tt.*
        FROM ${table} t
        LEFT JOIN ${translationTable} tt ON t.id = tt.${itemId.split('_')[0]}_id AND tt.language = ?
        WHERE t.id = ?
        LIMIT 1
    `;
    db.query(sql, [language, itemId], callback);
};

const getAllByLanguage = (table, translationTable, language = "en", callback) => {
    const sql = `
        SELECT 
            t.*,
            tt.*
        FROM ${table} t
        LEFT JOIN ${translationTable} tt ON t.id = tt.${table.slice(0, -1)}_id AND tt.language = ?
        ORDER BY t.id DESC
    `;
    db.query(sql, [language], callback);
};

const addTranslation = (translationTable, itemIdField, itemId, language, data, callback) => {
    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    
    const sql = `
        INSERT INTO ${translationTable} 
        (${itemIdField}, language, ${columns})
        VALUES (?, ?, ${placeholders})
        ON DUPLICATE KEY UPDATE
        ${Object.keys(data).map(col => `${col}=VALUES(${col})`).join(", ")}
    `;

    const values = [itemId, language, ...Object.values(data)];
    db.query(sql, values, callback);
};

module.exports = {
    getByLanguage,
    getAllByLanguage,
    addTranslation
};