const db = require('../../config/db'); // Import the MySQL connection

// Get all reservations with guest names
async function getAllReservations(req, res) {
  try {
    const queryString = `
      SELECT 
        r.reservation_id, 
        r.room_id, 
        g.name AS guest_name, 
        r.checkIn_date, 
        r.checkOut_date
      FROM reservation r
      JOIN guest g ON r.guest_id = g.email
    `;

    db.query(queryString, (err, results) => {
      if (err) {
        console.error("Error fetching reservations:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Create a new reservation
async function createReservation(req, res) {
  try {
    const { room_id, guest_name, checkIn_date, checkOut_date } = req.body;

    // Validate input
    if (!room_id || !guest_name || !checkIn_date || !checkOut_date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Find the guest email based on guest_name
    const guestQuery = "SELECT email FROM guest WHERE name = ?";
    db.query(guestQuery, [guest_name], (err, guestResults) => {
      if (err || guestResults.length === 0) {
        console.error("Error fetching guest email or guest not found:", err);
        return res.status(404).json({ error: "Guest not found" });
      }

      const guestEmail = guestResults[0].email;

      // Insert the reservation
      const reservationQuery = `
        INSERT INTO reservation (room_id, guest_id, checkIn_date, checkOut_date)
        VALUES (?, ?, ?, ?)
      `;
      const values = [room_id, guestEmail, checkIn_date, checkOut_date];

      db.query(reservationQuery, values, (err, reservationResults) => {
        if (err) {
          console.error("Error creating reservation:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ message: "Reservation created successfully", reservation_id: reservationResults.insertId });
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { getAllReservations, createReservation };
