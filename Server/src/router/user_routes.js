const express = require("express");
const router = express.Router();

const {create_user, user_login} = require('../controller/user_controller');
const {registerSchema, loginSchema} = require('../validations/user_validators')
const {addToCart, viewCart, removeFromCart, checkoutCart} = require('../controller/cart_controller');
const {addToCartSchema, removeFromCartSchema} = require('../validations/cart_validators');
const {authenticate} = require('../middleware/middleware')

const validate = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ status:false, message: error.details[0].message });
    next();
};
router.post('/register', validate(registerSchema),create_user );
router.post('/login',validate(loginSchema), user_login);
router.post('/addToCart',authenticate, validate(addToCartSchema), addToCart);
router.get('/viewCart',authenticate, viewCart);
router.put('/removeFromCart',authenticate, validate(removeFromCartSchema), removeFromCart);
router.post('/checkoutCart', authenticate, checkoutCart);

module.exports = router;