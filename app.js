require("dotenv").config();
const express = require("express");
///const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pets", petRoutes);

module.exports = app;
