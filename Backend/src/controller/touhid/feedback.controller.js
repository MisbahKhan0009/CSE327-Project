/**
 * @file feedback.controller.js
 * @description Controller for handling guest feedback operations, including submission and retrieval of feedback.
 */

const db = require('../../config/db'); // Database connection file
const util = require('util');

// Promisify the query function
const query = util.promisify(db.query).bind(db);

/**
 * Submit guest feedback.
 * 
 * @async
 * @function submitFeedback
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Feedback details provided by the guest.
 * @param {number} req.body.guest_id - ID of the guest submitting feedback.
 * @param {string} req.body.description - Feedback description provided by the guest.
 * @param {string} req.body.date - Date of the feedback submission.
 * @param {number} req.body.rating - Guest's rating (e.g., 1-5).
 * @param {Object} res - Express response object.
 * @returns {void}
 * 
 * @example
 * // Request example
 * // POST /api/feedback
 * // Body: { "guest_id": "tohid@ferdoush.com", "description": "Great stay!", "date": "2024-11-27", "rating": 5 }
 * 
 * // Response example (201 Created)
 * // { "message": "Thank you for your feedback!" }
 * 
 * @throws {400} - If required fields are missing.
 * @throws {500} - If there is a server error while submitting feedback.
 */
const submitFeedback = async (req, res) => {
    const { guest_id, description, date, rating } = req.body;

    if (!guest_id || !description || !date || !rating) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
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

/**
 * Retrieve all feedback for admin view.
 * 
 * @async
 * @function getFeedback
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Array<Object>} - List of feedback entries from the database.
 * 
 * @example
 * // Request example
 * // GET /api/feedback
 * 
 * // Response example (200 OK)
 * // [
 * //   { "feedback_id": 1, "guest_id": "tohid@ferdoush.com", "description": "Great stay!", "date": "2024-11-27", "rating": 5 },
 * //   { "feedback_id": 2, "guest_id": "kuddus@ali.com", "description": "Needs improvement.", "date": "2024-11-26", "rating": 3 }
 * // ]
 * 
 * @throws {500} - If there is a server error while fetching feedback.
 */
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
