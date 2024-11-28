/**
 * @file getreservation.controller.js
 * @description Controller for handling operations related to reservations, such as fetching current reservation details for a guest.
 */

const db = require('../../config/db'); // Database connection file

/**
 * Fetch current reservation details for a guest.
 * 
 * @function getCurrentReservation
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.guestId - The ID of the guest whose reservation details are being fetched.
 * @param {Object} res - Express response object.
 * @returns {Array<Object>} 200 - List of current reservation details, including room category, check-in date, check-out date, and booking status.
 * @returns {Object} 400 - Error message if the guest ID is not provided.
 * @returns {Object} 404 - Error message if no current reservations are found for the guest.
 * @returns {Object} 500 - Error message if there is a database error.
 * 
 * @example
 * // Request example
 * // GET /api/getreservations/current-reservation?guestId="tohid@ferdoush.com"
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "roomCategory": "Double",
 * //     "checkInDate": "2024-11-20",
 * //     "checkOutDate": "2024-11-25",
 * //     "bookingStatus": "Active"
 * //   }
 * // ]
 * 
 * // Error response example (400 Bad Request)
 * // { "message": "Guest email (guestId) is required." }
 * 
 * // Error response example (404 Not Found)
 * // { "message": "No current reservation found for this guest." }
 * 
 * // Error response example (500 Internal Server Error)
 * // { "message": "An error occurred while fetching reservation details." }
 */
const getCurrentReservation = (req, res) => {
    const { guestId } = req.query;

    if (!guestId) {
        return res.status(400).json({ message: "Guest email (guestId) is required." });
    }

    const today = new Date().toISOString().split("T")[0]; // Get the current date in YYYY-MM-DD format

    const query = `
        SELECT 
            r.category AS roomCategory,
            res.checkIn_date AS checkInDate,
            res.checkOut_date AS checkOutDate,
            CASE
                WHEN res.checkOut_date > ? THEN 'Active'
                ELSE 'Completed'
            END AS bookingStatus
        FROM reservation AS res
        JOIN room AS r ON res.room_id = r.room_id
        WHERE res.guest_id = ?
        AND res.checkOut_date > ?
    `;

    db.query(query, [today, guestId, today], (err, results) => {
        if (err) {
            console.error("Error fetching reservation details:", err);
            return res.status(500).json({ message: "An error occurred while fetching reservation details." });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "No current reservation found for this guest." });
        }

        return res.status(200).json(results);
    });
};

module.exports = { getCurrentReservation };
