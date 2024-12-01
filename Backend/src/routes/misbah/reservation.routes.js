// routes/reservations.routes.js
const express = require('express');
const router = express.Router();

// Define routes
router.post("/", createReservation); // Route to create a new reservation
router.get("/", getAllReservations); // Route to get all reservations

export default router; // Export the router as default
