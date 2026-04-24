const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const upload = require("../middleware/upload");

const uploadSingle = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("MULTER/CLOUDINARY ERROR:", err.message);
            return res.status(500).json({ error: err.message });
        }
        next();
    });
};

router.get("/", menuController.getMenuItems);
router.get("/:id", menuController.getMenuItem);
router.post("/", uploadSingle, menuController.createMenuItem);
router.put("/:id", uploadSingle, menuController.updateMenuItem);
router.delete("/:id", menuController.deleteMenuItem);

module.exports = router;