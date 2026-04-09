const Joi = require("joi");

const storySchema = Joi.object({
    subtitle: Joi.string().allow(""),
    title: Joi.string().required(),
    content: Joi.string().required(),
    highlight: Joi.string().allow(""),
});

module.exports = storySchema;