const express = require("express");
const router = express.Router();
const guestController = require('../../controller/touhid/guest.controller');
const amenityController = require('../../controller/touhid/amenity.controller'); // Reuse existing amenities controller

// Route to get guest information
router.get('/info', guestController.getGuestInfo);

// Route to fetch all amenities (read-only for guests)
router.get('/amenities', amenityController.getAmenities);

module.exports = router;
