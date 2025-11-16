E-Commerce API (Node.js + Express + MySQL)

A simple e-commerce backend built using Node.js, Express, MySQL, and Joi
validation.
It includes user authentication, product management, cart operations,
and checkout functionality.

Features

-   User Registration & Login (JWT Auth)
-   Product CRUD (Add & View)
-   Add Products to Cart
-   View Cart with Total Price
-   Remove Item 
-   Checkout Order
-   MySQL Database with Connection Pooling
-   Joi Validation for all inputs

Project Structure

src/
│── controller/
│── middleware/
│── router/
│── validations/
│── SQL/schema.sql
│── db.js
│── server.js
.env


Installation

npm install

Environment Variables

DB_HOST=localhost 
DB_USER=root 
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db 
JWT_SECRET=your_jwt_secret 
PORT=3001

Run the Server

node src/server.js

API Endpoints (Summary)

User: 
POST /user/register - Register user 
POST /user/login - Login user

Products: 
POST /products/addProduct - Add product 
GET /products/listProducts - Get all products

Cart: 
POST /user/addToCart - Add product to cart 
GET /user/viewCart -View cart 
DELETE user/removeFromCart - Remove

Checkout: 
POST /user/checkoutCart - Checkout user cart

Database Setup

Run sql file: 
src/SQL/schema.sql

Tech Stack

-   Node.js
-   Express.js
-   MySQL (mysql2)
-   JWT
-   Joi Validator
