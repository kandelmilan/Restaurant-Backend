const app = require("./app");
const db = require("./config/db");
const PORT = 8000;

// Test DB connection
db.query("SHOW TABLES", (err, result) => {
    if (err) {
        console.log("Error checking tables:", err);
    } else {
        console.log("Tables:", result);
        console.log(`MySQL Connected and Server will run at http://localhost:${PORT}`);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});