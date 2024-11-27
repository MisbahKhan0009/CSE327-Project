// routes/reservations.routes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../../controller/misbah/reservation.controller');

// Route to create a new reservation
router.post('/', reservationController.createReservation);

// Route to get all reservations (optional for testing)
router.get('/', reservationController.getAllReservations);

module.exports = router;
