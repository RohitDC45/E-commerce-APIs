const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Access denied. No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "rohit");
        req.user = decoded; 

        next();
    } catch (err) {
        res.status(400).json({ status:false, message:"Invalid token" });
    }
};

module.exports = {authenticate };