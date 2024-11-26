const db = require('../../config/db');

// Function to fetch current reservation details
const getCurrentReservation = (req, res) => {
    const { guestId } = req.query;

    // Validate if guestId is provided
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

    // Execute the query
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