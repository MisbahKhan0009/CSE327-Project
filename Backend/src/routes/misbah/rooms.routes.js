/**
 * @file rooms.routes.js
 * @description Routes for handling room-related operations in the hotel booking system.
 */

const express = require("express");
const { getAllRooms } = require("../../controller/misbah/rooms.controller");

const router = express.Router();

/**
 * Route to get all rooms.
 *
 * This route allows fetching a list of all rooms available in the hotel.
 * It triggers the `getAllRooms` function from the rooms controller.
 *
 * @route GET /api/rooms
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {Array} 200 - List of all rooms available.
 * @returns {Object} 500 - Internal server error if fetching rooms fails.
 *
 * @example
 * // Request example
 * // GET /api/rooms
 *
 * // Response example (200 OK)
 * // [
 * //   {
 * //     "room_id": "101",
 * //     "room_type": "Single",
 * //     "price": 100,
 * //     "isBooked": false,
 * //     "description": "A comfortable single room.",
 * //     "amenities": ["WiFi", "TV"]
 * //   },
 * //   {
 * //     "room_id": "102",
 * //     "room_type": "Double",
 * //     "price": 150,
 * //     "isBooked": false,
 * //     "description": "A spacious double room.",
 * //     "amenities": ["WiFi", "Pool"]
 * //   }
 * // ]
 *
 * // Response example (500 Internal Server Error)
 * // {
 * //   "message": "Error fetching rooms",
 * //   "error": "Detailed error message"
 * // }
 */
router.get("/", getAllRooms);

// Export the router
module.exports = router;
