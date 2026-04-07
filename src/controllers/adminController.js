const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password required" });
  }

  adminModel.findAdminByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const admin = results[0];

    // Compare password using bcrypt
    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // You can add JWT token here for session if needed
    return res.json({ success: true, message: "Login successful", admin: { id: admin.id, name: admin.name, email: admin.email } });
  });
};

module.exports = {
  login,
};