/**
 * @file room.controller.js
 * @description Controller for handling room-related operations.
 */

const db = require('../../config/db'); // Import the MySQL connection

/**
 * Get available rooms.
 * 
 * This function retrieves a list of rooms from the database that are not booked (`isBooked = 0`).
 * 
 * @function getAvailableRooms
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // GET /api/rooms/available
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "roomId": 1,
 * //     "roomNumber": "101",
 * //     "isBooked": 0
 * //   },
 * //   {
 * //     "roomId": 2,
 * //     "roomNumber": "102",
 * //     "isBooked": 0
 * //   }
 * // ]
 * 
 * // Response example (404 Not Found)
 * // {
 * //   "message": "No available rooms found"
 * // }
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "error": "Internal Server Error"
 * // }
 */
async function getAvailableRooms(req, res) {
  try {
    const queryString = "SELECT * FROM room WHERE isBooked = 0"; // Retrieving rooms that are not booked
    
    // Use db.query to run the query
    db.query(queryString, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // If no rooms are found, return 404
      if (results.length === 0) {
        return res.status(404).json({ message: "No available rooms found" });
      }

      // Respond with available rooms
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAvailableRooms };
