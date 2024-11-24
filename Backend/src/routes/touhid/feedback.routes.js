// feedback.routes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../../controller/touhid/feedback.controller');

// Route to submit feedback
router.post('/', feedbackController.submitFeedback); // POST method for feedback submission

// (Optional) Route to fetch all feedback
router.get('/', feedbackController.getFeedback);

module.exports = router;
