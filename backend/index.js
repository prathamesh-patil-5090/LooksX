const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const authRoute = require("./routes/auth");
const appointmentRoutes = require("./routes/appointmentRoutes");
const barberRoutes = require("./routes/barberRoutes"); // Uncomment and fix import

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(
  cors({
    origin: process.env.CONNECTION_URL, // React app's URL - removed trailing slash
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/barber", barberRoutes); // This route is now properly configured
app.get("/api/health", (req, res) => {
  return res.json({
    health: "ok",
  });
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});
