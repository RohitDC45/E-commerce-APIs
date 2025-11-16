const Joi = require("joi");

const addToCartSchema = Joi.object({
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required()
});

const removeFromCartSchema = Joi.object({
    cart_id: Joi.number().integer().required()
});

module.exports = { addToCartSchema, removeFromCartSchema };
