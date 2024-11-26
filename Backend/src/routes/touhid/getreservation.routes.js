const express = require("express");
const router = express.Router();
const reservationController = require('../../controller/touhid/getreservation.controller');

// Route to fetch current reservation details
router.get("/current-reservation", reservationController.getCurrentReservation);

module.exports = router;
