const express = require('express');
const cors = require('cors');
const availabilityRoutes = require('./routes/sumaya/availiability.routes');
const reservationRoutes = require('./routes/sumaya/reservation.routes');
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/touhid/admin.routes");
const amenityRoutes = require("./routes/touhid/amenity.routes");
const guestRoutes = require("./routes/touhid/guest.routes");
const feedbackRoutes = require('./routes/touhid/feedback.routes'); 
const reservationRoutes = require("./routes/touhid/getreservation.routes");
const paymentHistoryRoutes = require("./routes/touhid/history.routes");


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());  // For parsing application/json
app.use(bodyParser.json());

// Room availability routes
app.use('/api/rooms', availabilityRoutes);  // '/api/rooms/available' for the room availability route
app.use('/api/reservations', reservationRoutes);


// Routes Touhid(Begains)
app.use("/api/admin", adminRoutes); 
app.use("/api/amenities", amenityRoutes);
app.use("/api/guest", guestRoutes); 
app.use('/api/feedback', feedbackRoutes);
app.use("/api/getreservations", reservationRoutes);
app.use("/api/payments", paymentHistoryRoutes);
// Routes Touhid(Ends)


//routes
app.use("/api/register", registrationRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/bills", billingRoutes);  // Use billing routes



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
 