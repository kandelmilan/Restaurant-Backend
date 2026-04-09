const Joi = require("joi");

const testimonialSchema = Joi.object({
    author: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    text: Joi.string().required(),
});

module.exports = testimonialSchema;