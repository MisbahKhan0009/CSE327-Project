// app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/touhid/admin.routes");
const amenityRoutes = require("./routes/touhid/amenity.routes");
const guestRoutes = require("./routes/touhid/guest.routes"); // Import guest routes
const feedbackRoutes = require('./routes/touhid/feedback.routes'); // Import feedback routes
const reservationRoutes = require("./routes/touhid/getreservation.routes");
const paymentHistoryRoutes = require("./routes/touhid/history.routes");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/amenities", amenityRoutes); // Amenities routes
app.use("/api/guest", guestRoutes); // Guest routes
app.use('/api/feedback', feedbackRoutes);
app.use("/api/getreservations", reservationRoutes);
app.use("/api/payments", paymentHistoryRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 