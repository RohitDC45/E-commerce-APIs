const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Rohit@4596",
  database: process.env.DB_NAME || "ecommerce_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
(async () => {
  try {
    const [rows] = await db.query("SELECT DATABASE() AS current_db");
    console.log("Connected to database:", rows[0].current_db);
  } catch (err) {
    console.error("DB check failed:", err.message);
  }
})();
if(db){
    console.log("Connected to MySQL database")
}
module.exports = db;