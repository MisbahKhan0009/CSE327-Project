// src/routes/rooms.routes.js
import express from "express";
import { getAllRooms } from "../controller/rooms.controller.js"; // Import the rooms controller

const router = express.Router();

// Define the GET route to fetch all rooms
router.get("/", getAllRooms);

// Export the router as default
export default router;
