// app.js
const express = require("express");
const cors = require('cors');
const adminRoutes = require('./routes/touhid/admin.routes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Use routes from the router object
app.use('/api/admin', adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
