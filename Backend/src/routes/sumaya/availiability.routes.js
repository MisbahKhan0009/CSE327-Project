const express = require('express');
const router = express.Router();
const availabilityController = require('../../controller/sumaya/availiability.controller');

// Route to get available rooms
router.get('/available', availabilityController.getAvailableRooms);

module.exports = router;
