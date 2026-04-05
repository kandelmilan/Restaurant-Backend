import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all menu items
export const getMenu = async (req, res) => {
    try {
        const menu = await prisma.menu.findMany({ orderBy: { id: "asc" } });
        res.json(menu);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch menu items" });
    }
};

// Add new menu item
export const addMenuItem = async (req, res) => {
    const { name, price, image, category, isVeg, spiceLevel, description } = req.body;
    try {
        const newItem = await prisma.menu.create({
            data: { name, price: parseFloat(price), image, category, isVeg, spiceLevel, description },
        });
        res.json(newItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to add menu item" });
    }
};

// Update existing menu item
export const updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, price, image, category, isVeg, spiceLevel, description } = req.body;
    try {
        const updatedItem = await prisma.menu.update({
            where: { id: parseInt(id) },
            data: { name, price: parseFloat(price), image, category, isVeg, spiceLevel, description },
        });
        res.json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update menu item" });
    }
};

// Delete menu item
export const deleteMenuItem = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.menu.delete({ where: { id: parseInt(id) } });
        res.json({ message: "Menu item deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete menu item" });
    }
};