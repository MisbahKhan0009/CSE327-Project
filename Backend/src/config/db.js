// src/config/db.js
import mysql from "mysql2"; // Import the MySQL package

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "HotelManagementSystem",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to the database.");
  }
});

export default db; // Export the database connection
