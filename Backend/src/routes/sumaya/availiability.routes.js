// src/routes/availability.routes.js
import { Router } from "express";
import { getAvailableRooms } from "../controllers/availability.controller";

const router = Router();

// Route to get available rooms
router.get("/available", getAvailableRooms);

export default router;
