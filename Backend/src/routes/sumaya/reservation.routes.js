/**
 * @file reservation.routes.js
 * @description Routes for handling reservation-related operations.
 */

const express = require('express');
const router = express.Router();
const reservationController = require('../../controller/sumaya/reservation.controller');

/**
 * Get all reservations.
 * 
 * This route retrieves all reservations, including details like reservation ID, room ID, guest name, 
 * check-in date, and check-out date.
 * 
 * @name GET /api/reservations
 * @function
 * @memberof module:routes/reservation
 * @inner
 * 
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
 * //     "guest_name": "John Doe",
 * //     "checkIn_date": "2024-01-01",
 * //     "checkOut_date": "2024-01-05"
 * //   }
 * // ]
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "error": "Internal Server Error"
 * // }
 */
router.get('/', reservationController.getAllReservations);

/**
 * Create a new reservation.
 * 
 * This route allows the creation of a new reservation. It requires the room ID, guest name, 
 * check-in date, and check-out date as input.
 * 
 * @name POST /api/reservations
 * @function
 * @memberof module:routes/reservation
 * @inner
 * 
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
 * //   "guest_name": "John Doe",
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
 * // Response example (500 Internal Server Error)
 * // {
 * //   "error": "Internal Server Error"
 * // }
 */
router.post('/', reservationController.createReservation);

module.exports = router;
