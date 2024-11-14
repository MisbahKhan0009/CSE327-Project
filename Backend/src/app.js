// src/app.js

import express from "express";
import cors from "cors"; // Import the CORS middleware
import roomsRoutes from "./routes/rooms.routes.js";

const app = express();

// Use CORS to allow requests from any origin
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use("/api/rooms", roomsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
