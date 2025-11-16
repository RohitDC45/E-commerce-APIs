require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const user_route = require('./router/user_routes');
const product_route = require('./router/product_routes');
const DB = require('../src/db')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/user", user_route);
app.use("/products", product_route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});