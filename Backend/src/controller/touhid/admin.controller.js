// controller/admin.controller.js
const db = require('../../config/db');

// Get admin information by email
exports.getAdminInfo = (req, res) => {
  const adminEmail = req.query.email || "kuddus@ali.com"; // Default email if none provided for testing

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
