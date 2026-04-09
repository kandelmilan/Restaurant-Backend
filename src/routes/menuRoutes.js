const express = require("express");
const router = express.Router();
const controller = require("../controllers/menuController");
const validate = require("../middleware/validate");
const menuSchema = require("../validators/menuValidator");

router.get("/", controller.getMenu);
router.post("/", validate(menuSchema), controller.createMenu);
router.put("/:id", validate(menuSchema), controller.updateMenu);
router.delete("/:id", controller.deleteMenu);

module.exports = router;