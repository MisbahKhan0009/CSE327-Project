/**
 * @file availability.routes.js
 * @description Routes for handling room availability-related operations.
 */

const express = require('express');
const router = express.Router();
const availabilityController = require('../../controller/sumaya/availiability.controller');

/**
 * Get available rooms.
 * 
 * This route retrieves all rooms that are currently not booked.
 * 
 * @name GET /api/rooms/available
 * @function
 * @memberof module:routes/availability
 * @inner
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * 
 * @returns {void}
 * 
 * @example
 * // Request example
 * // GET /api/rooms/available
 * 
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "roomId": 1,
 * //     "roomNumber": "101",
 * //     "isBooked": 0
 * //   },
 * //   {
 * //     "roomId": 2,
 * //     "roomNumber": "102",
 * //     "isBooked": 0
 * //   }
 * // ]
 * 
 * // Response example (404 Not Found)
 * // {
 * //   "message": "No available rooms found"
 * // }
 * 
 * // Response example (500 Internal Server Error)
 * // {
 * //   "error": "Internal Server Error"
 * // }
 */
router.get('/available', availabilityController.getAvailableRooms);

module.exports = router;
