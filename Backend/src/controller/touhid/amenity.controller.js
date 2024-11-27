/**
 * @file amenity.controller.js
 * @description Controller for handling CRUD operations related to amenities.
 */

const db = require('../../config/db'); // Database connection file
const util = require('util');

// Promisify the query function
const query = util.promisify(db.query).bind(db);

/**
 * Fetch all amenities.
 * 
 * @async
 * @function getAmenities
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {void}
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
 * 
 * @throws {500} - Failed to fetch amenities.
 */
const getAmenities = async (req, res) => {
    try {
        const rows = await query('SELECT * FROM amenity');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching amenities:', error);
        res.status(500).json({ error: 'Failed to fetch amenities' });
    }
};

/**
 * Add a new amenity.
 * 
 * @async
 * @function addAmenity
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Data for the new amenity.
 * @param {string} req.body.name - Name of the amenity.
 * @param {string} req.body.description - Description of the amenity.
 * @param {number} req.body.numbers - Quantity of the amenity.
 * @param {Object} res - Express response object.
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/amenities
 * // Body: { "name": "Spa", "description": "Relaxing spa services", "numbers": 1 }
 * 
 * // Response example (201 Created)
 * // { "message": "Amenity added successfully", "amenityId": 3 }
 * 
 * @throws {500} - Failed to add amenity.
 */
const addAmenity = async (req, res) => {
    const { name, description, numbers } = req.body;
    try {
        const result = await query(
            'INSERT INTO amenity (name, description, numbers) VALUES (?, ?, ?)',
            [name, description, numbers]
        );
        res.status(201).json({ message: 'Amenity added successfully', amenityId: result.insertId });
    } catch (error) {
        console.error('Error adding amenity:', error);
        res.status(500).json({ error: 'Failed to add amenity' });
    }
};

/**
 * Update an existing amenity.
 * 
 * @async
 * @function updateAmenity
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {number} req.params.amenity_id - ID of the amenity to update.
 * @param {Object} req.body - Updated data for the amenity.
 * @param {string} req.body.name - Updated name of the amenity.
 * @param {string} req.body.description - Updated description of the amenity.
 * @param {number} req.body.numbers - Updated quantity of the amenity.
 * @param {Object} res - Express response object.
 * @returns {void}
 * 
 * @example
 * // Request example
 * // PUT /api/amenities/1
 * // Body: { "name": "Updated Pool", "description": "New description", "numbers": 2 }
 * 
 * // Response example (200 OK)
 * // { "message": "Amenity updated successfully" }
 * 
 * @throws {500} - Failed to update amenity.
 */
const updateAmenity = async (req, res) => {
    const { amenity_id } = req.params;
    const { name, description, numbers } = req.body;
    try {
        await query(
            'UPDATE amenity SET name = ?, description = ?, numbers = ? WHERE amenity_id = ?',
            [name, description, numbers, amenity_id]
        );
        res.status(200).json({ message: 'Amenity updated successfully' });
    } catch (error) {
        console.error('Error updating amenity:', error);
        res.status(500).json({ error: 'Failed to update amenity' });
    }
};

module.exports = {
    getAmenities,
    addAmenity,
    updateAmenity,
};
