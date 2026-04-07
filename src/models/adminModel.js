const db = require("../config/db");

const findAdminByEmail = (email, callback) => {
    const sql = "SELECT * FROM admins WHERE email = ?";
    db.query(sql, [email], callback);
};

module.exports = {
    findAdminByEmail,
};