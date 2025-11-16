const db = require("../db");

const addToCart = async (req, res) => {
    try {
        const { product_id, quantity } = req.body;
        id = product_id;
        const user_id = req.user.id;

        const [product] = await db.query("SELECT * FROM products WHERE id = ?", [product_id]);

        if (!product.length) return res.status(404).json({ status:false, message:"Product not found" });

        if (product[0].stock < quantity) {
            return res.status(400).json({ status:false, message:"Not enough stock" });
        }

        const [existing] = await db.query(
            "SELECT * FROM cart WHERE user_id = ? AND product_id = ?",
            [user_id, product_id]
        );      

        if (existing.length) {
            await db.query(
                "UPDATE cart SET quantity = quantity + ? WHERE product_id = ?",
                [quantity, existing[0].id]
            );
        } else {
            await db.query(
                "INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)",
                [user_id, product_id, quantity]
            );
        }

        res.status(200).json({ status:true, message:"Product added to cart" });
    } catch (err) {
        res.status(500).json({ status:false, error: err.message });
    }
};

const viewCart = async (req, res) => {
    try {
        const user_id = req.user.id;
        const [cart] = await db.query(
            `SELECT c.id as cart_id, p.id as product_id, p.name, p.price, c.quantity, (p.price * c.quantity) as total
             FROM cart c
             JOIN products p ON c.product_id = p.id
             WHERE c.user_id = ?`,
            [user_id]
        );

        const total_price = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

        res.status(200).json({ status:true, cart, total_price });
    } catch (err) {
        res.status(500).json({ status:false, error: err.message });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const { cart_id } = req.body;
        const user_id = req.user.id;

        const [existing] = await db.query(
            "SELECT * FROM cart WHERE id = ? AND user_id = ?",
            [cart_id, user_id]
        );
        if (!existing.length) return res.status(404).json({ status:false, message:"Cart item not found" });

        await db.query("DELETE FROM cart WHERE id = ?", [cart_id]);
        res.status(200).json({ status:true, message:"Item removed from cart" });
    } catch (err) {
        res.status(500).json({ status:false, error: err.message });
    }
};


const checkoutCart = async (req, res) => {
    try {
        const user_id = req.user.id;

        const [cart] = await db.query(
            `SELECT c.id as cart_id, p.id as product_id, p.name, p.price, p.stock, c.quantity
             FROM cart c
             JOIN products p ON c.product_id = p.id
             WHERE c.user_id = ?`,
            [user_id]
        );

        if (!cart.length) return res.status(400).json({ status:false, message:"Cart is empty" });

        for (const item of cart) {
            if (item.quantity > item.stock) {
                return res.status(400).json({ status:false, message:`Not enough stock for ${item.name}` });
            }
        }

        let total_price = 0;
        for (const item of cart) {
            total_price += item.price * item.quantity;
            await db.query("UPDATE products SET stock = stock - ? WHERE id = ?", [item.quantity, item.product_id]);
        }

        const [orderResult] = await db.query(
            "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
            [user_id, total_price]
        );
        const order_id = orderResult.insertId;

        for (const item of cart) {
            await db.query(
                "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
                [order_id, item.product_id, item.quantity, item.price]
            );
        }

        await db.query("DELETE FROM cart WHERE user_id = ?", [user_id]);

        res.status(200).json({ status:true, message:"Checkout successful", order_id, total_price });
    } catch (err) {
        res.status(500).json({ status:false, error: err.message });
    }
};

module.exports = { addToCart, viewCart, removeFromCart, checkoutCart };
