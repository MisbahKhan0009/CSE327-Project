const express = require("express");
const router = express.Router();
const amenityController = require('../../controller/touhid/amenity.controller');

// Routes for amenities
router.get('/', amenityController.getAmenities);
router.post('/', amenityController.addAmenity);
router.put('/:amenity_id', amenityController.updateAmenity);

module.exports = router;
