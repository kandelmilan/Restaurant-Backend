const express = require("express");
const router = express.Router();
const controller = require("../controllers/testimonialController");
const validate = require("../middlewares/validate");
const testimonialSchema = require("../validators/testimonialValidator");

router.get("/", controller.getTestimonials);
router.post("/", validate(testimonialSchema), controller.createTestimonial);
router.put("/:id", validate(testimonialSchema), controller.updateTestimonial);
router.delete("/:id", controller.deleteTestimonial);

module.exports = router;