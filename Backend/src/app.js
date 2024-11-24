const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const registrationRoutes = require('./routes/jarif/registration.routes');
const loginRoutes = require('./routes/jarif/login.routes');
const billingRoutes = require('./routes/jarif/billing.routes');  // Import billing routes


const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use("/api/register", registrationRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/bills", billingRoutes);  // Use billing routes



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
