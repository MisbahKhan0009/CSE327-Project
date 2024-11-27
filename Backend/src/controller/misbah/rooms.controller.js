// controller/rooms.controller.js
const db = require("../../config/db"); // CommonJS syntax for importing the database connection

// Controller function to get all rooms
exports.getAllRooms = (req, res) => {
  const query = "SELECT * FROM room"; // Adjust the table name if different

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results); // Send back the list of rooms as JSON
  });
};
