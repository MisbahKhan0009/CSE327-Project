// routes/rooms.routes.js
const express = require("express");
const { getAllRooms } = require("../../controller/misbah/rooms.controller");

const router = express.Router();

// Define the route to get all rooms
router.get("/", getAllRooms);

// Export the router
module.exports = router;
