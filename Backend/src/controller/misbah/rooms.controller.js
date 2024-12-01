/**
 * @file rooms.controller.js
 * @description Controller for managing room-related operations in the hotel booking system.
 */

const db = require("../../config/db"); // CommonJS syntax for importing the database connection

/**
 * Get all rooms.
 *
 * This function retrieves all rooms from the `room` table and returns the list as a JSON response.
 * It is typically used to display all available rooms to guests or for administrative purposes.
 *
 * @function getAllRooms
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {void}
 *
 * @example
 * // Request example
 * // GET /api/rooms
 *
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "room_id": 1,
 * //     "room_number": "101",
 * //     "category": "single",
 * //     "price": 5000,
 * //     "description": "A cozy room for one guest.",
 * //     "isBooked": false
 * //   },
 * //   {
 * //     "room_id": 2,
 * //     "room_number": "102",
 * //     "category": "double",
 * //     "price": 8000,
 * //     "description": "A spacious room for two guests.",
 * //     "isBooked": true
 * //   }
 * // ]
 *
 * // Response example (500 Internal Server Error)
 * // {
 * //   "message": "Database error"
 * // }
 */
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
