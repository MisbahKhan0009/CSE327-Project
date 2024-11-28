/**
 * @file admin.controller.js
 * @description Controller for handling admin-related operations.
 */

const db = require('../../config/db');

/**
 * Get admin information by email.
 * 
 * This function retrieves admin details (email, name, and phone) from the database based on the provided email.
 * 
 * @function getAdminInfo
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters in the request.
 * @param {string} [req.query.email] - The email of the admin to search for.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // GET /api/admin/info?email=kuddus@ali.com
 * 
 * // Response example (200 OK)
 * // {
 * //   "email": "kuddus@ali.com",
 * //   "name": "Kuddus Ali",
 * //   "phone": "1234567890"
 * // }
 * 
 * // Response example (404 Not Found)
 * // {
 * //   "message": "Admin not found"
 * // }
 */
exports.getAdminInfo = (req, res) => {
  const adminEmail = req.query.email;

  const query = 'SELECT email, name, phone FROM admin WHERE email = ?';
  db.query(query, [adminEmail], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (results.length === 0) {
      console.log("No admin found with this email.");
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    console.log("Admin data retrieved:", results[0]);
    res.status(200).json(results[0]);
  });
};
