// src/app.js
const express = require("express");
const routes = require("./routes/routes"); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Use routes from the router object
app.use("/api", routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
