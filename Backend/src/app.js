const express = require('express');
const cors = require('cors');
const availabilityRoutes = require('./routes/sumaya/availiability.routes');
const reservationRoutesSumaiya = require('./routes/sumaya/reservation.routes');
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/touhid/admin.routes");
const amenityRoutes = require("./routes/touhid/amenity.routes");
const guestRoutes = require("./routes/touhid/guest.routes");
const feedbackRoutes = require("./routes/touhid/feedback.routes");
const reservationRoutes = require("./routes/touhid/getreservation.routes");
const paymentHistoryRoutes = require("./routes/touhid/history.routes");
const roomsRoutes = require("./routes/misbah/rooms.routes");
const reservationRoutesMisba = require("./routes/misbah/reservation.routes");
const registrationRoutes = require("./routes/jarif/registration.routes");
const loginRoutes = require("./routes/jarif/login.routes");
const billingRoutes = require("./routes/jarif/billing.routes");

const app = express();

// Use CORS to allow requests from any origin
app.use(cors());
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());

// Room availability routes
app.use('/api/rooms', availabilityRoutes);  // '/api/rooms/available' for the room availability route // working
app.use('/api/reservations', reservationRoutesSumaiya); //working


// Routes Touhid(Begains)
app.use("/api/admin", adminRoutes); //working
app.use("/api/amenities", amenityRoutes); //working
app.use("/api/guest", guestRoutes);  //working //http://localhost:3000/api/guest/info?email=misbah@khan.com
app.use("/api/feedback", feedbackRoutes); // working
app.use("/api/getreservations", reservationRoutes); // working http://localhost:3000/api/getreservations/current-reservation?guestId=%22tohid@ferdoush.com
app.use("/api/payments", paymentHistoryRoutes); //working //http://localhost:3000/api/payments/payment-history?guestEmail=tohid@ferdoush.com
// Routes Touhid(Ends)

//routes
app.use("/api/register", registrationRoutes); //working
app.use("/api/login", loginRoutes); //working
app.use("/api/bills", billingRoutes);  //working

// Set up routes
app.use("/api/roomList", roomsRoutes); // misbah //working
app.use("/api/reservationList", reservationRoutesMisba); // misbah // working

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
