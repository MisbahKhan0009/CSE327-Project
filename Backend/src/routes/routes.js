// src/routes/routes.js
import { Router } from "express";
const router = Router();

// Define routes
router.get("/", (req, res) => {
  res.send("Welcome to Hotel Management API");
});

// Example route for getting rooms
router.get("/rooms", (req, res) => {
  res.json({ message: "List of rooms" });
});

// Export the router object
export default router;
