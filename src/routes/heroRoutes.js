const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");
const upload = require("../middleware/upload");

router.get("/", heroController.getHeroes);
router.post("/", upload.single("image"), heroController.createHero);
router.put("/:id", upload.single("image"), heroController.updateHero);
router.delete("/:id", heroController.deleteHero);

module.exports = router;