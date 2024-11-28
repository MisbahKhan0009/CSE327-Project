/**
 * @file feedback.routes.js
 * @description Routes for handling guest feedback, including submission and retrieval of feedback.
 */

const express = require('express');
const router = express.Router();
const feedbackController = require('../../controller/touhid/feedback.controller');

/**
 * Submit guest feedback.
 * 
 * @route POST /api/feedback
 * @group Feedback - Operations related to guest feedback
 * @param {Object} req.body.required - Feedback details provided by the guest.
 * @param {number} req.body.guest_id - ID of the guest submitting feedback.
 * @param {string} req.body.description - Feedback description provided by the guest.
 * @param {string} req.body.date - Date of the feedback submission.
 * @param {number} req.body.rating - Guest's rating (e.g., 1-5).
 * @returns {Object} 201 - Success message if feedback is submitted.
 * @returns {Object} 400 - Error message if required fields are missing.
 * @returns {Object} 500 - Error message if submission fails due to a server error.
 * 
 * @example
 * // Request example
 * // POST /api/feedback
 * // Body: { "guest_id": "tohid@ferdoush.com", "description": "Great stay!", "date": "2024-11-27", "rating": 5 }
 * 
 * // Response example (201 Created)
 * // { "message": "Thank you for your feedback!" }
 */
router.post('/', feedbackController.submitFeedback);

/**
 * Fetch all feedback for admin view.
 * 
 * @route GET /api/feedback
 * @group Feedback - Operations related to guest feedback
 * @returns {Array<Object>} 200 - List of feedback entries from the database.
 * @returns {Object} 500 - Error message if fetching fails due to a server error.
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
 */
router.get('/', feedbackController.getFeedback);

module.exports = router;
