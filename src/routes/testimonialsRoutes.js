const express = require("express");
const router = express.Router();
const controller = require("../controllers/testimonialControllers");
const validate = require("../middleware/validate");
const testimonialSchema = require("../validators/testimonialValidator");

router.get("/", controller.getTestimonials);
router.post("/", validate(testimonialSchema), controller.createTestimonial);
router.put("/:id", validate(testimonialSchema), controller.updateTestimonial);
router.delete("/:id", controller.deleteTestimonial);

module.exports = router;