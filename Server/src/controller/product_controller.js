const db = require("../db");

const listProducts = async (req, res) => {
    try {
        const [products] = await db.query("SELECT * FROM products");
        res.status(200).json({ status: true, products });
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};

const addProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        

        const [result] = await db.query(
            "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)",
            [name, description, price, stock]
        );

        res.status(201).json({
            status: true,
            message: "Product added successfully",
            product_id: result.insertId
        });
    } catch (err) {
        res.status(500).json({ status: false, error: err.message });
    }
};

module.exports = { listProducts, addProduct };
