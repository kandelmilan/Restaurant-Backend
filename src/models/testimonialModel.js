// need to test in postman
const db = require("../config/db");

const getAllTestimonials = (callback) => {
    db.query("SELECT * FROM testimonials ORDER BY id ASC", callback);
};

const createTestimonial = (data, callback) => {
    const sql = `
    INSERT INTO testimonials
    (author, rating, text)
        VALUES (?, ?, ?)
`;
    db.query(sql, [
        data.author,
        data.rating,
        data.text
    ], callback);
};
const updateTestimonial = (id, data, callback) => {
    const sql = `UPDATE testimonials SET author=?,rating=?,text=? WHERE id=?`;
    db.query(sql, [
        data.author,
        data.rating,
        data.text,
        id
    ], callback);
};

const deleteTestimonial = (id, callback) => {
    const sql = `DELETE FROM testimonials WHERE id=?`;
    db.query(sql, [id], callback);
};

module.exports = {
    getAllTestimonials,
    updateTestimonial,
    createTestimonial,
    deleteTestimonial
}