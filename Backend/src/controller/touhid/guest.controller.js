/**
 * @file guest.controller.js
 * @description Controller for handling guest-related operations, such as retrieving guest information by email.
 */

const db = require('../../config/db'); // Database connection file

/**
 * Retrieve guest information by email.
 * 
 * @function getGuestInfo
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.email - The email address of the guest to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Object} - Guest information including email, name, and phone number.
 * 
 * @example
 * // Request example
 * // GET /api/guest/info?email="tohid@ferdoush.com"
 * 
 * // Response example (200 OK)
 * // { "email": "tohid@ferdoush.com", "name": "Touhid Ferdoush", "phone": "123456789" }
 * 
 * // Error response example (404 Not Found)
 * // { "message": "Guest not found" }
 * 
 * // Error response example (500 Internal Server Error)
 * // { "message": "Database error", "error": <error details> }
 * 
 * @throws {404} - If no guest is found with the provided email.
 * @throws {500} - If there is a database error.
 */
exports.getGuestInfo = (req, res) => {
  const guestEmail = req.query.email; 

  const query = 'SELECT email, name, phone FROM guest WHERE email = ?';
  db.query(query, [guestEmail], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (results.length === 0) {
      console.log("No guest found with this email.");
      return res.status(404).json({ message: 'Guest not found' });
    }

    console.log("Guest data retrieved:", results[0]);
    res.status(200).json(results[0]);
  });
};
