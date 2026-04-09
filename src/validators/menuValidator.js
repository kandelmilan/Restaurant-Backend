const Joi = require("joi");

const menuSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    image: Joi.string().uri().required(),
    category: Joi.string().required(),
    isVeg: Joi.boolean().required(),
    spiceLevel: Joi.number().min(1).max(3).required(),
    description: Joi.string().allow(""),
});

module.exports = menuSchema;