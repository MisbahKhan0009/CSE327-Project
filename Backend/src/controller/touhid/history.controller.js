/**
 * @file history.controller.js
 * @description Controller for handling payment-history related operations, such as fetching payment history for a guest.
 */

const db = require('../../config/db'); // Database connection file

/**
 * Fetch the payment history for a guest by email.
 * 
 * @function getPaymentHistory
 * @param {Object} req - Express request object.
 * @param {Object} req.query - Query parameters from the request.
 * @param {string} req.query.guestEmail - The email of the guest whose payment history is being fetched.
 * @param {Object} res - Express response object.
 * @returns {Array<Object>} 200 - List of payment history records, including bill ID, total amount, and payment date.
 * @returns {Object} 400 - Error message if the guest email is not provided.
 * @returns {Object} 404 - Error message if the guest or payment history is not found.
 * @returns {Object} 500 - Error message if a database error occurs.
 * 
 * @example
 * // Request example
 * // GET /api/payments/payment-history?guestEmail=tohid@ferdoush.com
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "bill_id": 3,
 * //     "total": 1500,
 * //     "payment_date": "2024-11-20"
 * //   },
 * //   {
 * //     "bill_id": 4,
 * //     "total": 2000,
 * //     "payment_date": "2024-10-15"
 * //   }
 * // ]
 * 
 * // Error response example (400 Bad Request)
 * // { "message": "Guest email is required." }
 * 
 * // Error response example (404 Not Found - Guest)
 * // { "message": "Guest not found." }
 * 
 * // Error response example (404 Not Found - Payment History)
 * // { "message": "No payment history found for this guest." }
 * 
 * // Error response example (500 Internal Server Error)
 * // { "message": "An error occurred while fetching payment history." }
 */
const getPaymentHistory = (req, res) => {
    const { guestEmail } = req.query;

    // Validate if guest email is provided
    if (!guestEmail) {
        return res.status(400).json({ message: "Guest email is required." });
    }

    // First, verify the guest exists
    const checkGuestQuery = 'SELECT * FROM guest WHERE email = ?';
    
    db.query(checkGuestQuery, [guestEmail], (guestErr, guestResults) => {
        if (guestErr) {
            console.error("Error checking guest:", guestErr);
            return res.status(500).json({ message: "An error occurred while checking guest information." });
        }

        // If no guest found
        if (guestResults.length === 0) {
            return res.status(404).json({ message: "Guest not found." });
        }

        // Query to fetch payment history
        const paymentQuery = `
            SELECT 
                b.bill_id, 
                b.total, 
                b.date AS payment_date
            FROM guest g
            JOIN bill b ON g.bill_id = b.bill_id
            WHERE g.email = ?
            ORDER BY b.date DESC
        `;

        // Execute the query
        db.query(paymentQuery, [guestEmail], (err, results) => {
            if (err) {
                console.error("Error fetching payment history:", err);
                return res.status(500).json({ message: "An error occurred while fetching payment history." });
            }

            // If no payment history found
            if (results.length === 0) {
                return res.status(404).json({ message: "No payment history found for this guest." });
            }

            return res.status(200).json(results);
        });
    });
};

module.exports = { getPaymentHistory };
