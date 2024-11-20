const express = require('express');
const cors = require('cors');
const availabilityRoutes = require('./routes/sumaya/availiability.routes');
const reservationRoutes = require('./routes/sumaya/reservation.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // For parsing application/json

// Room availability routes
app.use('/api/rooms', availabilityRoutes);  // '/api/rooms/available' for the room availability route
app.use('/api/reservations', reservationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
