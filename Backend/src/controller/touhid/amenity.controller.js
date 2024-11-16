const db = require('../../config/db'); // Assuming you're using a database connection file

const util = require('util');

// Promisify the query function
const query = util.promisify(db.query).bind(db);

// Fetch all amenities
const getAmenities = async (req, res) => {
    try {
        const rows = await query('SELECT * FROM amenity'); // Use promisified query
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching amenities:', error);
        res.status(500).json({ error: 'Failed to fetch amenities' });
    }
};

// Add a new amenity
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

// Update an existing amenity
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