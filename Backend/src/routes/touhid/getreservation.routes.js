/**
 * @file getreservation.routes.js
 * @description Routes for handling reservation-related operations, such as fetching current reservation details for a guest.
 */

const express = require("express");
const router = express.Router();
const reservationController = require('../../controller/touhid/getreservation.controller');

/**
 * Fetch current reservation details for a guest.
 * 
 * @route GET /api/reservation/current-reservation
 * @group Reservation - Operations related to reservations
 * @param {string} req.query.guestId - The ID of the guest whose current reservation details are being fetched.
 * @returns {Array<Object>} 200 - List of current reservation details, including room category, check-in date, check-out date, and booking status.
 * @returns {Object} 400 - Error message if the guest ID is not provided.
 * @returns {Object} 404 - Error message if no current reservations are found for the guest.
 * @returns {Object} 500 - Error message if a database error occurs.
 * 
 * @example
 * // Request example
 * // GET /api/getreservations/current-reservation?guestId="tohid@ferdoush.com"
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "roomCategory": "Double",
 * //     "checkInDate": "2024-11-20",
 * //     "checkOutDate": "2024-11-25",
 * //     "bookingStatus": "Active"
 * //   }
 * // ]
 * 
 * // Error response example (400 Bad Request)
 * // { "message": "Guest email (guestId) is required." }
 * 
 * // Error response example (404 Not Found)
 * // { "message": "No current reservation found for this guest." }
 * 
 * // Error response example (500 Internal Server Error)
 * // { "message": "An error occurred while fetching reservation details." }
 */
router.get("/current-reservation", reservationController.getCurrentReservation);

module.exports = router;
