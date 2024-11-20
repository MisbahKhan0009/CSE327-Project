const express = require('express');
const router = express.Router();
const reservationController = require('../../controller/sumaya/reservation.controller');

// Route to get all reservations
router.get('/', reservationController.getAllReservations);

// Route to create a new reservation
router.post('/', reservationController.createReservation);

module.exports = router;
