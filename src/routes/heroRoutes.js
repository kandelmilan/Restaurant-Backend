const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const upload = require("../middleware/upload");

const uploadSingle = (req, res, next) => {
    upload.single("image")(req, res, (err) => {
        if (err) {
            console.error("MULTER/CLOUDINARY ERROR:", err.message);
            console.error("FULL ERROR:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("Upload success - req.file:", req.file);
        console.log("Upload success - req.body:", req.body);
        next();
    });
};

// Now use it in routes
router.get("/", heroController.getHeroes);
router.post("/", uploadSingle, heroController.createHero);
router.put("/:id", uploadSingle, heroController.updateHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;