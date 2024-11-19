const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/jarif/registration.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Registration routes
app.use("/api/register", registrationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
