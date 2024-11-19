// src/app.js
import express, { json } from "express";
import cors from "cors"; // Importing CORS
import availabilityRoutes from "./routes/availability.routes"; // Corrected path

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins (you can customize this for specific domains)
app.use(cors());  // You can configure options for more control, e.g., allowed origins

// Middleware
app.use(json());

// Use the routes for room availability
app.use("/api", availabilityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
