/**
 * @file reservations.controller.js
 * @description Controller for managing reservations in the hotel booking system.
 */

const db = require("../../config/db"); // Import database connection

/**
 * Create a new reservation.
 * 
 * This function creates a new reservation in the `reservation` table, using the guest's information,
 * room selection, and check-in/check-out dates. It also updates the room's availability status.
 * 
 * @function createReservation
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body containing reservation details.
 * @param {number} req.body.guest_id - The ID of the guest making the reservation.
 * @param {number} req.body.room_id - The ID of the room being reserved.
 * @param {string} req.body.checkIn_date - The check-in date (e.g., 'YYYY-MM-DD').
 * @param {string} req.body.checkOut_date - The check-out date (e.g., 'YYYY-MM-DD').
 * @param {number} req.body.bill_id - The ID of the bill associated with the reservation.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/reservations
 * // {
 * //   "guest_id": 1,
 * //   "room_id": 101,
 * //   "checkIn_date": "2024-12-01",
 * //   "checkOut_date": "2024-12-05",
 * //   "bill_id": 123
 * // }
 * 
 * // Response example (201 Created)
 * // {
 * //   "message": "Reservation created successfully",
 * //   "reservation_id": 456
 * // }
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "message": "Error creating reservation",
 * //   "error": "Error details"
 * // }
 */
exports.createReservation = async (req, res) => {
  const { guest_id, room_id, checkIn_date, checkOut_date, bill_id } = req.body;

  try {
    // Insert reservation into the database
    const query = `
      INSERT INTO reservation (guest_id, room_id, checkIn_date, checkOut_date, bill_id)
      VALUES (?, ?, ?, ?, ?)`;

    const [result] = await db.query(query, [
      guest_id,
      room_id,
      checkIn_date,
      checkOut_date,
      bill_id,
    ]);

    // Update room availability (set isBooked to TRUE)
    await db.query("UPDATE room SET isBooked = TRUE WHERE room_id = ?", [
      room_id,
    ]);

    res.status(201).json({
      message: "Reservation created successfully",
      reservation_id: result.insertId,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

/**
 * Get all reservations.
 * 
 * This function retrieves all reservations from the `reservation` table.
 * It is typically used for admin purposes to view all reservations in the system.
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
 * //     "guest_id": 1,
 * //     "room_id": 101,
 * //     "checkIn_date": "2024-12-01",
 * //     "checkOut_date": "2024-12-05",
 * //     "bill_id": 123
 * //   },
 * //   {
 * //     "reservation_id": 2,
 * //     "guest_id": 2,
 * //     "room_id": 102,
 * //     "checkIn_date": "2024-12-10",
 * //     "checkOut_date": "2024-12-15",
 * //     "bill_id": 124
 * //   }
 * // ]
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "message": "Error fetching reservations",
 * //   "error": "Error details"
 * // }
 */
exports.getAllReservations = async (req, res) => {
  try {
    const query = "SELECT * FROM reservation";
    const [result] = await db.query(query);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};
