/**
 * @file reservations.routes.js
 * @description Routes for handling reservation-related operations in the hotel booking system.
 */

const express = require("express");
const router = express.Router();
const reservationController = require("../../controller/misbah/reservation.controller");

/**
 * Route to create a new reservation.
 *
 * This route allows users to create a new reservation by providing necessary details such as guest ID, room ID, check-in and check-out dates, and bill ID.
 * It triggers the `createReservation` function from the reservation controller.
 *
 * @route POST /api/reservations
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The body of the request containing reservation details.
 * @param {string} req.body.guest_id - The ID of the guest making the reservation.
 * @param {string} req.body.room_id - The ID of the room being reserved.
 * @param {string} req.body.checkIn_date - The check-in date for the reservation.
 * @param {string} req.body.checkOut_date - The check-out date for the reservation.
 * @param {string} req.body.bill_id - The ID of the associated bill for the reservation.
 * @param {Object} res - Express response object.
 *
 * @returns {Object} 201 - Created reservation with reservation ID.
 * @returns {Object} 500 - Internal server error if the reservation creation fails.
 *
 * @example
 * // Request example
 * // POST /api/reservations
 * // {
 * //   "guest_id": "12345",
 * //   "room_id": "101",
 * //   "checkIn_date": "2024-12-05",
 * //   "checkOut_date": "2024-12-10",
 * //   "bill_id": "67890"
 * // }
 *
 * // Response example (201 Created)
 * // {
 * //   "message": "Reservation created successfully",
 * //   "reservation_id": 1
 * // }
 *
 * // Response example (500 Internal Server Error)
 * // {
 * //   "message": "Error creating reservation",
 * //   "error": "Detailed error message"
 * // }
 */
router.post("/", reservationController.createReservation);

/**
 * Route to get all reservations.
 *
 * This route retrieves all reservations from the database. It is typically used for admin purposes to view the list of all reservations.
 * It triggers the `getAllReservations` function from the reservation controller.
 *
 * @route GET /api/reservations
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {Array} 200 - List of all reservations.
 * @returns {Object} 500 - Internal server error if fetching reservations fails.
 *
 * @example
 * // Request example
 * // GET /api/reservations
 *
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "reservation_id": 1,
 * //     "guest_id": "12345",
 * //     "room_id": "101",
 * //     "checkIn_date": "2024-12-05",
 * //     "checkOut_date": "2024-12-10",
 * //     "bill_id": "67890"
 * //   },
 * //   {
 * //     "reservation_id": 2,
 * //     "guest_id": "67891",
 * //     "room_id": "102",
 * //     "checkIn_date": "2024-12-06",
 * //     "checkOut_date": "2024-12-12",
 * //     "bill_id": "67891"
 * //   }
 * // ]
 *
 * // Response example (500 Internal Server Error)
 * // {
 * //   "message": "Error fetching reservations",
 * //   "error": "Detailed error message"
 * // }
 */
router.get("/", reservationController.getAllReservations);

module.exports = router;
