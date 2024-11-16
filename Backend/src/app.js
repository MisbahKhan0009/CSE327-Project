// app.js
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/touhid/admin.routes');
const amenityRoutes = require("./routes/touhid/amenity.routes");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Use routes from the router object
app.use('/api/admin', adminRoutes);
// Route for amenities
app.use("/api/amenities", amenityRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
