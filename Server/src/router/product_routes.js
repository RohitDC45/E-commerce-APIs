const express = require("express");
const router = express.Router();

const {listProducts, addProduct} = require('../controller/product_controller');
const {addProductSchema} = require("../validations/product_validator");

const validate = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json({ status:false, message: error.details[0].message });
    next();
};

router.post('/addProduct', validate(addProductSchema), addProduct);
router.get('/listProducts', listProducts);

module.exports = router;