const db = require("../config/db");

const createReservation = (data) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO reservations SET ?",
            data,
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

module.exports = { createReservation };