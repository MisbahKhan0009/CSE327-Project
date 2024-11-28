// app.js
const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const roomsRoutes = require("./routes/misbah/rooms.routes");
const reservationRoutes = require("./routes/misbah/reservation.routes");

const app = express();

// Use CORS to allow requests from any origin
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Set up routes
app.use("/api/roomList", roomsRoutes); // misbah
app.use("/api/reservationList", reservationRoutes); // misbah

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
