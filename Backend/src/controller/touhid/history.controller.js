const db = require('../../config/db');

// Function to fetch payment history for a guest
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