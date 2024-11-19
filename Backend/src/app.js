import express, { json } from "express";
import cors from "cors";
import registrationRoutes from "./routes/jarif/registration.routes";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(json());

// Registration routes
app.use("/api/register", registrationRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
