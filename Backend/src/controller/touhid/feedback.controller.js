const db = require('../../config/db'); // Assuming you're using a database connection file
const util = require('util');

// Promisify the query function
const query = util.promisify(db.query).bind(db);

// Submit feedback
const submitFeedback = async (req, res) => {
    const { guest_id, description, date, rating } = req.body;

    // Validate that required fields are present
    if (!guest_id || !description || !date || !rating) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert feedback into the database
        await query(
            'INSERT INTO userfeedback (guest_id, description, date, rating) VALUES (?, ?, ?, ?)',
            [guest_id, description, date, rating]
        );
        res.status(201).json({ message: 'Thank you for your feedback!' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Unable to submit feedback. Please try again later.' });
    }
};


// Get feedback for admin view
const getFeedback = async (req, res) => {
    try {
        const rows = await query('SELECT * FROM userfeedback');
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ error: 'Failed to fetch feedback' });
    }
};

module.exports = {
    submitFeedback,
    getFeedback,
};
