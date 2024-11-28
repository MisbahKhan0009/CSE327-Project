/**
 * @file guest.routes.js
 * @description Routes for handling guest-related operations, including retrieving guest information and fetching available amenities.
 */

const express = require("express");
const router = express.Router();
const guestController = require('../../controller/touhid/guest.controller');
const amenityController = require('../../controller/touhid/amenity.controller'); // Reusing amenities controller

/**
 * Retrieve guest information by email.
 * 
 * @route GET /api/guest/info
 * @group Guest - Operations related to guest users
 * @param {string} req.query.email - The email address of the guest to retrieve.
 * @returns {Object} 200 - Guest information including email, name, and phone number.
 * @returns {Object} 404 - Error message if no guest is found with the provided email.
 * @returns {Object} 500 - Error message if a database error occurs.
 * 
 * @example
 * // Request example
 * // GET /api/guest/info?email=johndoe@example.com
 * 
 * // Response example (200 OK)
 * // { "email": "tohid@ferdoush.com", "name": "Touhid Ferdoush", "phone": "123456789" }
 */
router.get('/info', guestController.getGuestInfo);

/**
 * Fetch all amenities (read-only for guests).
 * 
 * @route GET /api/guest/amenities
 * @group Guest - Operations related to guest users
 * @returns {Array<Object>} 200 - A list of available amenities.
 * @returns {Object} 500 - Error message if a database error occurs while fetching amenities.
 * 
 * @example
 * // Request example
 * // GET /api/guest/amenities
 * 
 * // Response example (200 OK)
 * // [
 * //   { "amenity_id": 1, "name": "Swimming Pool", "description": "Olympic size pool.", "numbers": 1 },
 * //   { "amenity_id": 2, "name": "Gym", "description": "Fully equipped gym.", "numbers": 1 }
 * // ]
 */
router.get('/amenities', amenityController.getAmenities);

module.exports = router;
