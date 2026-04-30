const db = require("../config/db");

const getHeroByLanguage = (language = "en", callback) => {
    const sql = `
        SELECT 
            h.id,
            h.image,
            COALESCE(ht.tagline, h.tagline) as tagline,
            COALESCE(ht.title, h.title) as title,
            COALESCE(ht.highlight, h.highlight) as highlight,
            COALESCE(ht.description, h.description) as description,
            ht.language
        FROM heroes h
        LEFT JOIN hero_translations ht ON h.id = ht.hero_id AND ht.language = ?
        ORDER BY h.id DESC
        LIMIT 1
    `;
    db.query(sql, [language], callback);
};

const getAllHeroes = (callback) => {
    const sql = `
        SELECT 
            h.*,
            JSON_OBJECT(
                'en', COALESCE((SELECT JSON_OBJECT('tagline', tagline, 'title', title, 'highlight', highlight, 'description', description) 
                        FROM hero_translations WHERE hero_id = h.id AND language = 'en'), JSON_OBJECT('tagline', '', 'title', '', 'highlight', '', 'description', '')),
                'ja', COALESCE((SELECT JSON_OBJECT('tagline', tagline, 'title', title, 'highlight', highlight, 'description', description) 
                        FROM hero_translations WHERE hero_id = h.id AND language = 'ja'), JSON_OBJECT('tagline', '', 'title', '', 'highlight', '', 'description', ''))
            ) as translations
        FROM heroes h
        ORDER BY h.id DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return callback(err);
        
        // Parse JSON if it's a string
        const parsed = results.map(hero => ({
            ...hero,
            translations: typeof hero.translations === 'string' ? JSON.parse(hero.translations) : hero.translations
        }));
        
        callback(null, parsed);
    });
};

const createHero = (data, callback) => {
    console.log("heroModel.createHero called with:", data);
    
    const sql = `INSERT INTO heroes (tagline, title, highlight, description, image) VALUES (?, ?, ?, ?, ?)`;
    const values = [data.tagline, data.title, data.highlight, data.description, data.image];
    
    console.log("SQL values:", values);
    
    db.query(sql, values, callback);
};

const updateHero = (id, data, callback) => {
    console.log("heroModel.updateHero called with ID:", id, "data:", data);
    
    const sql = `UPDATE heroes SET tagline=?, title=?, highlight=?, description=?, image=? WHERE id=?`;
    const values = [data.tagline, data.title, data.highlight, data.description, data.image, id];
    
    console.log("SQL values:", values);
    
    db.query(sql, values, callback);
};

const addHeroTranslation = (heroId, language, data, callback) => {
    console.log("heroModel.addHeroTranslation called - heroId:", heroId, "language:", language, "data:", data);
    
    const sql = `
        INSERT INTO hero_translations (hero_id, language, tagline, title, highlight, description)
        VALUES (?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        tagline=VALUES(tagline), 
        title=VALUES(title), 
        highlight=VALUES(highlight), 
        description=VALUES(description)
    `;
    
    const values = [heroId, language, data.tagline, data.title, data.highlight, data.description];
    
    console.log("SQL values:", values);
    
    db.query(sql, values, (err, result) => {
        console.log("Translation result:", err ? `Error: ${err.message}` : "Success");
        callback(err, result);
    });
};

const deleteHero = (id, callback) => {
    const sql = "DELETE FROM heroes WHERE id=?";
    db.query(sql, [id], callback);
};

module.exports = {
    getHeroByLanguage,
    getAllHeroes,
    createHero,
    updateHero,
    addHeroTranslation,
    deleteHero
};