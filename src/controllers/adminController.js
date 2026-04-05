import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Login admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) return res.status(401).json({ message: "Admin not found" });

        const valid = await bcrypt.compare(password, admin.password);
        if (!valid) return res.status(401).json({ message: "Invalid password" });

        res.json({ success: true, adminId: admin.id, email: admin.email, role: admin.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Login failed" });
    }
};

// Create admin (for first-time setup)
export const createAdmin = async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await prisma.admin.create({
            data: { email, password: hashedPassword, name },
        });
        res.json(admin);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create admin" });
    }
};