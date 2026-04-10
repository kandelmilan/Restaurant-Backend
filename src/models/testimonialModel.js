// need to test in postman
const db = require("../config/db");

const getAllTestimonials = (callback) => {
    db.query("SELECT * FROM testimonials ORDER BY id ASC", callback);
};

const createTestimonial = (data, callback) => {
    const sql = `
    INSERT INTO testimonial
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
    const sql = `UPDATE testimonial SET author=?,rating=?,text=?`;
    db.query(sql, [
        data.author,
        data.rating,
        data.text,
        id
    ], callback);
};

const deleteTestimonial = (id, callback) => {
    db.query(`DELETE FROM testimonial WHERE id=?`, [id], callback);
    db.query(sql, [
        data.author,
        data.rating,
        data.text,
        id
    ], callback);
};


exports.module = {
    getAllTestimonials,
    updateTestimonial,
    createTestimonial,
    deleteTestimonial
}