/**
 * @file reservation.controller.js
 * @description Controller for handling reservation-related operations.
 */

const db = require('../../config/db'); // Import the MySQL connection

/**
 * Get all reservations with guest names.
 * 
 * This function retrieves all reservations from the database, including reservation details 
 * and the associated guest names.
 * 
 * @function getAllReservations
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // GET /api/reservations
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "reservation_id": 1,
 * //     "room_id": 101,
 * //     "guest_name": "Sumaya Akter",
 * //     "checkIn_date": "2024-01-01",
 * //     "checkOut_date": "2024-01-05"
 * //   },
 * //   {
 * //     "reservation_id": 2,
 * //     "room_id": 102,
 * //     "guest_name": "Kismat Mim",
 * //     "checkIn_date": "2024-01-10",
 * //     "checkOut_date": "2024-01-15"
 * //   }
 * // ]
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "error": "Internal Server Error"
 * // }
 */
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

/**
 * Create a new reservation.
 * 
 * This function creates a new reservation in the database. It associates the reservation with
 * an existing guest based on their name and validates the input before inserting the record.
 * 
 * @function createReservation
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing reservation details.
 * @param {number} req.body.room_id - ID of the room to be reserved.
 * @param {string} req.body.guest_name - Name of the guest making the reservation.
 * @param {string} req.body.checkIn_date - Check-in date in the format YYYY-MM-DD.
 * @param {string} req.body.checkOut_date - Check-out date in the format YYYY-MM-DD.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/reservations
 * // {
 * //   "room_id": 101,
 * //   "guest_name": "Sumaya Akter",
 * //   "checkIn_date": "2024-01-01",
 * //   "checkOut_date": "2024-01-05"
 * // }
 * 
 * // Response example (201 Created)
 * // {
 * //   "message": "Reservation created successfully",
 * //   "reservation_id": 1
 * // }
 * 
 * // Response example (400 Bad Request)
 * // {
 * //   "error": "All fields are required"
 * // }
 * 
 * // Response example (404 Not Found)
 * // {
 * //   "error": "Guest not found"
 * // }
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "error": "Internal Server Error"
 * // }
 */
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
