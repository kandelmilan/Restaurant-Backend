const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const storySchema = require("../validators/storyValidator");
const validate = require("../middleware/validate");

router.get("/", storyController.getStories);
router.post("/", validate(storySchema), storyController.createStory);//validate(storySchema)
router.put("/:id", validate(storySchema), storyController.updateStory);//validate(storySchema),
router.delete("/:id", storyController.deleteStory);

module.exports = router;