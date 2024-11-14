// src/controller/rooms.controller.js
import db from "../config/db.js"; // Ensure the database connection is correctly imported

// Controller function to get all rooms
export const getAllRooms = (req, res) => {
  const query = "SELECT * FROM room"; // Adjust the table name if different

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results); // Send back the list of rooms as JSON
  });
};
