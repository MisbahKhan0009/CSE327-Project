/**
 * @file amenity.routes.js
 * @description Routes for managing amenities, including fetching, adding, and updating amenity details.
 */

const express = require("express");
const router = express.Router();
const amenityController = require('../../controller/touhid/amenity.controller');

/**
 * Fetch all amenities.
 * 
 * @route GET /api/amenities
 * @group Amenity - Operations related to amenities
 * @returns {Array<Object>} 200 - List of amenities.
 * @returns {Object} 500 - Error message if fetching fails.
 * 
 * @example
 * // Request example
 * // GET /api/amenities
 * 
 * // Response example (200 OK)
 * // [
 * //   { "amenity_id": 1, "name": "Swimming Pool", "description": "Outdoor pool", "numbers": 1 },
 * //   { "amenity_id": 2, "name": "Gym", "description": "Fully equipped gym", "numbers": 1 }
 * // ]
 */
router.get('/', amenityController.getAmenities);

/**
 * Add a new amenity.
 * 
 * @route POST /api/amenities
 * @group Amenity - Operations related to amenities
 * @param {Object} req.body.required - Data for the new amenity.
 * @param {string} req.body.name.required - Name of the amenity.
 * @param {string} req.body.description.required - Description of the amenity.
 * @param {number} req.body.numbers.required - Quantity of the amenity.
 * @returns {Object} 201 - Success message with the ID of the newly added amenity.
 * @returns {Object} 500 - Error message if adding fails.
 * 
 * @example
 * // Request example
 * // POST /api/amenities
 * // Body: { "name": "Spa", "description": "Relaxing spa services", "numbers": 1 }
 * 
 * // Response example (201 Created)
 * // { "message": "Amenity added successfully", "amenityId": 3 }
 */
router.post('/', amenityController.addAmenity);

/**
 * Update an existing amenity.
 * 
 * @route PUT /api/amenities/:amenity_id
 * @group Amenity - Operations related to amenities
 * @param {number} amenity_id.path.required - ID of the amenity to update.
 * @param {Object} req.body.required - Updated data for the amenity.
 * @param {string} req.body.name.required - Updated name of the amenity.
 * @param {string} req.body.description.required - Updated description of the amenity.
 * @param {number} req.body.numbers.required - Updated quantity of the amenity.
 * @returns {Object} 200 - Success message if the amenity is updated.
 * @returns {Object} 500 - Error message if updating fails.
 * 
 * @example
 * // Request example
 * // PUT /api/amenities/1
 * // Body: { "name": "Updated Pool", "description": "New description", "numbers": 2 }
 * 
 * // Response example (200 OK)
 * // { "message": "Amenity updated successfully" }
 */
router.put('/:amenity_id', amenityController.updateAmenity);

module.exports = router;
