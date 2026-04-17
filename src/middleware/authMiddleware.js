const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check header exists
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Check proper format: Bearer TOKEN
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);

        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;