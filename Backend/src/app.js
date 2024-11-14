// src/app.js
import express from "express"; // Using ES module syntax
import roomsRoutes from "./routes/rooms.routes.js"; // Import the rooms routes with correct path

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use the rooms routes
app.use("/api/rooms", roomsRoutes); // Map "/api/rooms" to roomsRoutes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
