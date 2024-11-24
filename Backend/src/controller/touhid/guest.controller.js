// controller/guest.controller.js
const db = require('../../config/db'); // Assuming you're using a database connection file

// Get guest information by email
exports.getGuestInfo = (req, res) => {
  const guestEmail = req.query.email; // Default email for testing

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

